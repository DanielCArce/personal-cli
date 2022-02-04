import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();
import { format_xml } from "../utils/format_xmls.js";
const { TOKEN_BCCR, EMAIL_BCCR, NAME_BCCR, SUBNIVEL_BCCR, ENDPOINT_BCCR } =
  process.env;

export async function api_cr_call(date_start, date_end, indicator) {
  const req = await fetch(
    `${ENDPOINT_BCCR}Indicador=${indicator}&FechaInicio=${date_start}&FechaFinal=${date_end}&Nombre=${NAME_BCCR}&SubNiveles=${SUBNIVEL_BCCR}&CorreoElectronico=${EMAIL_BCCR}&Token=${TOKEN_BCCR}`
  );
  format_xml(await req.text());
}
api_cr_call("02/02/2022", "03/02/2022", "3186");
