import fs from "fs";
import { get_current_date } from "./get_date.js";

export function write_json_file(content) {
  const uri = `./data/${get_current_date("-")}.json`;
  fs.writeFileSync(uri, content, {
    encoding: "utf8",
  });
}

export function read_from_file(uri) {
  const file = JSON.parse(fs.readFileSync(uri, { encoding: "utf8" }));
  const {} = file;
  console.log(file.elements);
}
read_from_file(`./data/temp${get_current_date("-")}.json`);
