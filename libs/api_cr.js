require("dotenv").config();
const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");
const xmljson = require("xml-js");
const { debug } = require("console");
const { SUBNIVEL_BCCR, NAME_BCCR, EMAIL_BCCR, TOKEN_BCCR } = process.env;
// const storage_dir = path.join(process.cwd(),)
const rootApi = `https://gee.bccr.fi.cr//Indicadores/Suscripciones/WS/wsindicadoreseconomicos.asmx/ObtenerIndicadoresEconomicosXML?`;
//Indicador=string&FechaInicio=string&FechaFinal=string&Nombre=string&SubNiveles=string&CorreoElectronico=string&Token=string

async function make_request_api_cr(indicador, fechaInicio, fechaFinal) {
  const rq = await fetch(
    `${rootApi}Indicador=${indicador}&FechaInicio=${fechaInicio}&FechaFinal=${fechaFinal}&Nombre=${NAME_BCCR}&SubNiveles=${SUBNIVEL_BCCR}&CorreoElectronico=${EMAIL_BCCR}&Token=${TOKEN_BCCR}`
  );

  const data = await rq.text();
  const xjson = xmljson.xml2json(data);
  const json = JSON.parse(xjson);
  const tc = json["elements"][0]["elements"][0]["text"];
  const dt = xmljson.xml2json(tc);
  fs.writeFileSync(`./data/${generate_filename(indicador)}`, dt, {
    encoding: "utf8",
  });
  console.log(get_file_data(indicador));
}

make_request_api_cr("318", "14/01/2022", "14/01/2022");

function get_file_data(indicador) {
  const gt = fs.readFileSync(
    __dirname + "/../data/" + generate_filename(indicador),
    {
      encoding: "utf8",
    }
  );
  const f = JSON.parse(gt);
  return f["elements"][0]["elements"][0]["elements"][2]["elements"][0]["text"];
}

function generate_filename(indicador) {
  return `${new Date().getDate()}_${new Date().getMonth()}${new Date().getFullYear()}_${indicador}.json`;
}

module.exports = { make_request_api_cr };
