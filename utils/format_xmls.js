import { xml2json } from "xml-js";
import { write_json_file } from "./files_handler.js";
export function format_xml(xml) {
  const x = xml2json(xml);
  write_json_file(x);
}
