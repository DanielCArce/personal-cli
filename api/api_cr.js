const fetch = require("node-fetch");
const dateFormated = require("../utils/get_format_date");
const { write_on_disk } = require("../utils/write_on_disk");
const { xml2json } = require("xml-js");
const { TOKEN_BCCR, EMAIL_BCCR, NAME_BCCR, SUBNIVEL_BCCR, ENDPOINT_BCCR } =
  process.env;

async function consume_api_bccr(indicator) {
  const date_start = dateFormated();
  const date_end = dateFormated();
  console.log({ date_start });
  console.log({ date_end });
  const query = await fetch(
    `${ENDPOINT_BCCR}Indicador=${indicator}&FechaInicio=${date_start}&FechaFinal=${date_end}&Nombre=${NAME_BCCR}&SubNiveles=${SUBNIVEL_BCCR}&CorreoElectronico=${EMAIL_BCCR}&Token=${TOKEN_BCCR}`
  );
  const data = await query.text();
  console.log(data);
}

module.exports = {
  consume_api_bccr,
};
