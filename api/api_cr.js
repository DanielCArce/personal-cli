import dotenv from "dotenv";
dotenv.config();
import fetch from "node-fetch";
import transformToXML from "./../utils/handle_xml.js";
const { ENDPOINT_BCCR, TOKEN_BCCR, EMAIL_BCCR, NAME_BCCR, SUBNIVEL_BCCR } =
  process.env;
const consume_api = async ({ indicator, start_date, end_date }) => {
  const request = await fetch(
    `${ENDPOINT_BCCR}Indicador=${indicator}&FechaInicio=${start_date}&FechaFinal=${end_date}&Nombre=${NAME_BCCR}&SubNiveles=${SUBNIVEL_BCCR}&CorreoElectronico=${EMAIL_BCCR}&Token=${TOKEN_BCCR}`
  );
  return transformToXML({
    filename: `${indicator}`,
    data: await request.text(),
  });
};
export default consume_api;
// consume_api({
//   indicator: "3179",
//   start_date: "17/09/2022",
//   end_date: "17/09/2022",
// });
