import json,sys
def stats(f):
  sb=json.load(open(f)); lim=[]
  for sec in ("actions","bonus_actions","reactions","special_abilities","legendary_actions"):
    for a in sb.get(sec) or []:
      l=a.get("limit")
      if l: lim.append({"id":l["name"],"max":l["uses"],"used":0,"resets":l["resets"],"formula":l["formula"]})
  for l in sb.get("limits") or []: lim.append({"id":l["name"],"max":l["uses"],"used":0,"resets":l["resets"],"formula":l["formula"]})
  return {"hp":sb["hp"]["value"],"ac":sb["armor_class"]["value"],"init":sb["initiative"],"limits":lim}
for f in sys.argv[1:]: print(json.dumps(stats(f)))
