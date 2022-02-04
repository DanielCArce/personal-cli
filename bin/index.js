#! /usr/bin/env node
import dotenv from "dotenv";
import inquirer from "inquirer";
import {
  get_entities_names,
  get_rate_entity,
} from "../utils/get_Indicators.js";
import { get_current_date } from "../utils/get_date.js";
import { api_cr_call } from "../api/api_cr.js";
dotenv.config();
let questions = [
  {
    type: "list",
    name: "TipoCambioTipo",
    message: "Seleciona que tipo de cambio",
    choices: ["Compra", "Venta", "Promedio"],
  },
  {
    type: "list",
    name: "TipoCambioEntidad",
    message: "",
    choices: get_entities_names(),
  },
  {
    type: "input",
    name: "DateStart",
    message: "Fecha Inicial para buscar",
    default: async () => {
      return await get_current_date("/");
    },
  },
  {
    type: "input",
    name: "DateEnd",
    message: "Fecha final para buscar",
    default: async () => {
      return await get_current_date("/");
    },
  },
];

inquirer.prompt(questions).then(async (answers) => {
  console.log({ answers });
  const { DateStart, DateEnd } = answers;
  let rate_code = null;
  const { TipoCambioTipo, TipoCambioEntidad } = answers;
  if (TipoCambioTipo == "Compra") {
    rate_code = await get_rate_entity(TipoCambioEntidad, "Compra");
    console.log(
      `El Tipo de Cambio de: ${TipoCambioEntidad} es: ${await api_cr_call(
        DateStart,
        DateEnd,
        rate_code
      )}`
    );
  }
  if (TipoCambioTipo == "Venta") {
    rate_code = await get_rate_entity(TipoCambioEntidad, "Venta");
    console.log(
      `El Tipo de Cambio de: ${TipoCambioEntidad} es: ${await api_cr_call(
        DateStart,
        DateEnd,
        rate_code
      )}`
    );
  } else {
    const buy_rate = await get_rate_entity(TipoCambioEntidad, "Compra");
    const sell_rate = await get_rate_entity(TipoCambioEntidad, "Venta");
    const buy = await api_cr_call(DateStart, DateEnd, buy_rate);
    const sell = await api_cr_call(DateStart, DateEnd, sell_rate);

    console.log((buy + sell) / 2);
  }
});
