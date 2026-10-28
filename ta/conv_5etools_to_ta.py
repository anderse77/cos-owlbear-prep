import json,re,sys
B=sys.argv[1]; names=sys.argv[2:]
d=json.load(open(B))
SIZE={"T":"Tiny","S":"Small","M":"Medium","L":"Large","H":"Huge","G":"Gargantuan"}
AL={"L":"Lawful","N":"Neutral","C":"Chaotic","G":"Good","E":"Evil","U":"Unaligned","A":"Any"}
XP={"0":10,"1/8":25,"1/4":50,"1/2":100,"1":200,"2":450,"3":700,"4":1100,"5":1800,"6":2300,"7":2900,"8":3900,"9":5000,"10":5900,"11":7200,"12":8400,"13":10000,"14":11500,"15":13000,"16":15000,"17":18000}
SK=["acrobatics","animal_handling","arcana","athletics","deception","history","insight","intimidation","investigation","medicine","nature","perception","performance","persuasion","religion","sleight_of_hand","stealth","survival"]
AB=["strength","dexterity","constitution","intelligence","wisdom","charisma"]; SH=["str","dex","con","int","wis","cha"]
NUM={"two":2,"three":3,"four":4,"five":5}
def clean(s):
    s=re.sub(r"\{@atk mw\}","Melee Weapon Attack:",s); s=re.sub(r"\{@atk rw\}","Ranged Weapon Attack:",s)
    s=re.sub(r"\{@atk mw,rw\}","Melee or Ranged Weapon Attack:",s); s=re.sub(r"\{@atk ms\}","Melee Spell Attack:",s); s=re.sub(r"\{@atk rs\}","Ranged Spell Attack:",s)
    s=s.replace("{@h}","Hit: "); s=re.sub(r"\{@hit (\-?\d+)\}",lambda m:("+" if not m.group(1).startswith("-") else "")+m.group(1),s)
    s=re.sub(r"\{@dc (\d+)\}",r"DC \1",s); s=re.sub(r"\{@recharge (\d)\}",r"(Recharge \1–6)",s); s=re.sub(r"\{@recharge\}","(Recharge 6)",s)
    s=re.sub(r"\{@\w+ ([^}|]*)[^}]*\}",r"\1",s); return s
def text(e):
    if isinstance(e,str): return clean(e)
    if isinstance(e,list): return " ".join(text(x) for x in e)
    if isinstance(e,dict):
        if e.get("type")=="list": return " ".join(text(i) for i in e.get("items",[]))
        if "entry" in e: return (e.get("name","")+". " if e.get("name") else "")+text(e["entry"])
        if "entries" in e: return (e.get("name","")+". " if e.get("name") else "")+text(e["entries"])
    return ""
def mod(x): return (x-10)//2
def limit_for(name, multi):
    n=name
    m=re.search(r"Recharge (\d)",n) or re.search(r"\{@recharge (\d)\}",n)
    if m: return {"name":clean(re.sub(r"\s*\(.*","",n)),"description":None,"uses":1,"resets":["Round"],"formula":f"1d6>{int(m.group(1))-1}"}
    m=re.search(r"\((\d+)/Day\)",n)
    if m: return {"name":clean(re.sub(r"\s*\(.*","",n)),"description":None,"uses":int(m.group(1)),"resets":["Long Rest"],"formula":None}
    if re.search(r"Recharges after a Short or Long Rest",n): return {"name":clean(re.sub(r"\s*\(.*","",n)),"description":None,"uses":1,"resets":["Short Rest","Long Rest"],"formula":None}
    if re.search(r"Recharges after a Long Rest",n): return {"name":clean(re.sub(r"\s*\(.*","",n)),"description":None,"uses":1,"resets":["Long Rest"],"formula":None}
    return multi
def act(e,multi):
    raw=json.dumps(e.get("entries",[]))
    hit=re.search(r"\{@hit (\-?\d+)\}",raw); dmg=re.search(r"\{@damage ([^}]+)\}",raw)
    isatk="{@atk" in raw
    lim=limit_for(e["name"], multi if isatk else {"name":"Action","description":None,"uses":1,"resets":["Round"],"formula":None})
    return {"name":clean(e["name"]),"desc":text(e.get("entries",[])),"attack_bonus":int(hit.group(1)) if hit else None,"stat_bonus":[],"use_proficiency":False,"needs_proficiency":False,"damage_dice":dmg.group(1).replace(" ","") if dmg else None,"limit":lim}
def trait(e):
    lim=None
    m=re.search(r"\((\d+)/Day\)",e["name"])
    if m: lim={"name":clean(re.sub(r"\s*\(.*","",e["name"])),"description":None,"uses":int(m.group(1)),"resets":["Long Rest"],"formula":None}
    return {"name":clean(e["name"]),"desc":text(e.get("entries",[])),"attack_bonus":None,"stat_bonus":[],"use_proficiency":False,"needs_proficiency":False,"damage_dice":None,"limit":lim}
def ac_of(m):
    a=m["ac"][0]
    if isinstance(a,dict): return a["ac"], ", ".join(clean(x) for x in a.get("from",[]))
    return a,""
def dmgs(lst):
    if not lst: return None
    out=[]
    for x in lst:
        if isinstance(x,str): out.append(x.capitalize())
        elif isinstance(x,dict):
            k=[k for k in ("resist","immune","vulnerable","conditionImmune") if k in x][0]
            out.append(", ".join(y.capitalize() for y in x[k] if isinstance(y,str))+(" "+x.get("note","") if x.get("note") else ""))
    return "; ".join(out)
res=[]
for name in names:
    m=[x for x in d["monster"] if x["name"].strip()==name][0]
    st=dict(zip(AB,[m[k] for k in SH]))
    sv={a+"_save":mod(st[a]) for a in AB}
    for k,v in (m.get("save") or {}).items(): sv[AB[SH.index(k)]+"_save"]=int(v)
    sk={k:None for k in SK}
    for k,v in (m.get("skill") or {}).items():
        kk=k.replace(" ","_")
        if kk in sk: sk[kk]=int(v)
    sp={"walk":None,"fly":None,"swim":None,"climb":None,"burrow":None,"hover":None,"lightwalking":None,"notes":None}
    for k,v in m.get("speed",{}).items():
        if k in sp: sp[k]=v if isinstance(v,int) else (v.get("number") if isinstance(v,dict) else None)
        elif k=="canHover" and v: sp["hover"]=True
    acts=m.get("action",[]); multi={"name":"Action","description":None,"uses":1,"resets":["Round"],"formula":None}
    for e in acts:
        if e["name"].startswith("Multiattack"):
            t=text(e["entries"]).lower(); n=next((v for k,v in NUM.items() if f"makes {k}" in t or f" {k} " in t),2)
            multi={"name":"Multiattack","description":None,"uses":n,"resets":["Round"],"formula":None}
    actions=[act(e,multi) for e in acts]
    for a in actions:
        if a["name"].startswith("Multiattack"): a["limit"]=multi
    traits=[trait(e) for e in m.get("trait",[])]
    limits=[]
    for sc in m.get("spellcasting",[]):
        parts=[text(sc.get("headerEntries",[]))]
        for lv,info in sorted((sc.get("spells") or {}).items()):
            spells=", ".join(clean(s) for s in info.get("spells",[]))
            parts.append(("Cantrips (at will): " if lv=="0" else f"Level {lv} ({info.get('slots','?')} slots): ")+spells)
            if lv!="0" and info.get("slots"): limits.append({"name":f"Spell slot {lv}","description":None,"uses":info["slots"],"resets":["Long Rest"],"formula":None})
        for key,lab in (("will","At will"),):
            if sc.get(key): parts.append(lab+": "+", ".join(clean(s) for s in sc[key]))
        for k,v in (sc.get("daily") or {}).items():
            n=int(k[0]); parts.append(f"{n}/day each: "+", ".join(clean(s) for s in v)); limits.append({"name":f"Innate {n}/day","description":None,"uses":n*len(v),"resets":["Long Rest"],"formula":None})
        parts+= [text(x) for x in sc.get("footerEntries",[])]
        traits.append({"name":clean(sc.get("name","Spellcasting")),"desc":" ".join(p for p in parts if p),"attack_bonus":None,"stat_bonus":[],"use_proficiency":False,"needs_proficiency":False,"damage_dice":None,"limit":None})
    leg=[]
    if m.get("legendary"):
        limits.append({"name":"Legendary Actions","description":None,"uses":m.get("legendaryActions",3),"resets":["Round"],"formula":None})
        for e in m["legendary"]:
            cost=re.search(r"Costs (\d) Actions",e["name"])
            leg.append({"name":clean(e["name"]),"desc":text(e.get("entries",[])),"attack_bonus":None,"stat_bonus":[],"use_proficiency":False,"needs_proficiency":False,"damage_dice":None,"limit":None})
    reac=[{"name":clean(e["name"]),"desc":text(e.get("entries",[])),"attack_bonus":None,"stat_bonus":[],"use_proficiency":False,"needs_proficiency":False,"damage_dice":None,"limit":{"name":"Reaction","description":None,"uses":1,"resets":["Round"],"formula":None}} for e in m.get("reaction",[])]
    ac,acs=ac_of(m); cr=str(m["cr"]["cr"] if isinstance(m["cr"],dict) else m["cr"])
    crn={"1/8":0.125,"1/4":0.25,"1/2":0.5}.get(cr) or float(cr)
    typ=m["type"]["type"] if isinstance(m["type"],dict) else m["type"]
    tags=", ".join(t if isinstance(t,str) else t.get("tag","") for t in (m["type"].get("tags",[]) if isinstance(m["type"],dict) else []))
    al=" ".join(AL.get(a,a) for a in m.get("alignment",[]) if isinstance(a,str)) or "Neutral"
    senses=[clean(s).capitalize() for s in (m.get("senses") or [])]+[f"Passive Perception {m.get('passive',10)}"]
    pb=2+max(0,(int(crn)-1)//4) if crn>=1 else 2
    sb={"name":m["name"].strip(),"size":SIZE[m["size"][0]],"type":typ.capitalize(),"subtype":tags.title() or None,"group":"Curse of Strahd","alignment":al,
        "armor_class":{"value":ac,"special":acs.title()},"hp":{"value":m["hp"]["average"],"hit_dice":m["hp"]["formula"].replace(" ","")},
        "speed":sp,"stats":st,"saving_throws":sv,"initiative":mod(st["dexterity"]),"proficiency_bonus":pb,"skills":sk,
        "damage_vulnerabilities":dmgs(m.get("vulnerable")),"damage_resistances":dmgs(m.get("resist")),"damage_immunities":dmgs(m.get("immune")),
        "condition_immunities":dmgs(m.get("conditionImmune")),"senses":senses,"languages":[clean(l) for l in (m.get("languages") or [])] or ["—"],
        "items":[],"challenge_rating":str(XP.get(cr,0)),"cr":crn,"actions":actions,"bonus_actions":[],"reactions":reac,"legendary_actions":leg,
        "special_abilities":traits,"spell_slots":[],"spells":[],"spell_dc":"","spell_attack":"","limits":limits,
        "about":"Curse of Strahd (2014-statblock, ingen 2024-version finns).","source":"Curse of Strahd (2014-statblock)"}
    res.append(sb)
    json.dump(sb,open(f"{sb['name']}.json","w"),ensure_ascii=False)
    print(f"{sb['name']}: HP {sb['hp']['value']} AC {ac} CR {cr} actions {len(actions)} traits {len(traits)} leg {len(leg)} limits {len(limits)} multi {multi['uses'] if multi['name']=='Multiattack' else '-'}")
