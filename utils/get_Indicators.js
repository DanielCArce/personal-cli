import fs from "fs";
function read_file() {
  const file = fs.readFileSync("./indicators.json", { encoding: "utf8" });
  const json = JSON.parse(file);
  return json;
}
export function get_entities_names() {
  const { Entities } = read_file();
  const banks = Entities.map(({ Entity }) => Entity);
  return banks;
}
export function get_rate_entity(entity_name, rate_type) {
  const { Entities } = read_file();
  const rate = Entities.filter((val) => {
    return val.Entity == entity_name;
  }).map((s) => {
    return s[rate_type];
  });
  return rate;
}
