import { toJson, toXml } from "xml2json";
import fs from "fs";
import cleanup from "./cleanup.js";
async function transformToXML({ filename, data }) {
  fs.writeFileSync(`./data/${filename}.xml`, data, {
    encoding: "utf8",
  });
  const xmlFile = fs.readFileSync(`./data/${filename}.xml`);
  const json = toJson(xmlFile);
  fs.writeFileSync(`./data/${filename}.json`, json, { encoding: "utf8" });
  const file = fs.readFileSync(`./data/${filename}.json`, { encoding: "utf8" });
  cleanup();

  return JSON.parse(file)["DataSet"]["diffgr:diffgram"][
    "Datos_de_INGC011_CAT_INDICADORECONOMIC"
  ]["INGC011_CAT_INDICADORECONOMIC"]["NUM_VALOR"];
}

export default transformToXML;
