#! /usr/bin/env node
//Load of ENV
import { config } from "dotenv";
config();
//Core Package
import inquirer from "inquirer";
import getIndicador from "../utils/getIndicador.js";
import APICR from "../api/api_cr.js";
//Utils packages
const questions = [
  {
    type: "list",
    name: "operation",
    choices: [
      "Tipo de Cambio de Compra",
      "Tipo de Cambio de Venta",
      "Tipo de Cambio Promedio",
    ],
  },
  {
    type: "list",
    name: "bank",
    choices: [
      "Banco Nacional de Costa Rica",
      "Banco de Costa Rica",
      "Banco Central de Costa Rica",
      "Banco Promerica",
      "Banco BAC Credomatic",
      "Banco Popular y de Dessarollo Comunal",
    ],
  },
  {
    type: "input",
    name: "start_date",
    default: () => {
      let date = new Date();
      return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
    },
  },
  {
    type: "input",
    name: "end_date",
    default: () => {
      let date = new Date();
      return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
    },
  },
];

inquirer.prompt(questions).then(async (answers) => {
  const ind = await getIndicador(answers.operation, answers.bank);
  const result = await APICR({
    indicator: ind,
    banco: answers.bank,
    start_date: answers.start_date,
    end_date: answers.end_date,
  });
  console.log(
    `El ${answers.operation} del ${answers.bank} es ${Number(result)}`
  );
});
