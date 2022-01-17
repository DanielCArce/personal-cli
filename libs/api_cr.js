require("dotenv").config();
const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");
const xmljson = require("xml-js");
const { SUBNIVEL_BCCR, NAME_BCCR, EMAIL_BCCR, TOKEN_BCCR } = process.env;
// const storage_dir = path.join(process.cwd(),)
const rootApi = `https://gee.bccr.fi.cr//Indicadores/Suscripciones/WS/wsindicadoreseconomicos.asmx/ObtenerIndicadoresEconomicosXML?`;
//Indicador=string&FechaInicio=string&FechaFinal=string&Nombre=string&SubNiveles=string&CorreoElectronico=string&Token=string

async function make_request_api_cr(indicador, fechaInicio, fechaFinal) {
  // const rq = await fetch(
  //   `${rootApi}Indicador=${indicador}&FechaInicio=${fechaInicio}&FechaFinal=${fechaFinal}&Nombre=${NAME_BCCR}&SubNiveles=${SUBNIVEL_BCCR}&CorreoElectronico=${EMAIL_BCCR}&Token=${TOKEN_BCCR}`
  // );
  const rq = await fetch(
    `${rootApi}Indicador=${indicador}&FechaInicio=${fechaInicio}&FechaFinal=${fechaFinal}&Nombre=${NAME_BCCR}&SubNiveles=${SUBNIVEL_BCCR}&CorreoElectronico=${EMAIL_BCCR}&Token=${TOKEN_BCCR}`
  );
  const data = await rq.text();
  const xjson = xmljson.xml2json(data);
  const json = JSON.parse(xjson);
  const tc = json["elements"][0]["elements"][0]["text"];
  const dt = xmljson.xml2json(tc);
  fs.writeFileSync(
    `./data/${new Date().getDate()}${new Date().getMonth()}${new Date().getFullYear()}_${indicador}.json`,
    dt,
    {
      encoding: "utf8",
    }
  );
}
make_request_api_cr("316", "14/01/2022", "14/01/2022");
// function get_formates() {
//   const gt = fs.readFileSync("16_0_2022(22_30).json", { encoding: "utf8" });
//   const f = JSON.parse(gt);
//   return f["elements"][0]["elements"][0]["elements"][2]["elements"][0]["text"];
// }
module.exports = { make_request_api_cr };
