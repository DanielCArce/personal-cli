#! /usr/bin/env node
//Load of ENV
const dotenv = require("dotenv");
dotenv.config();
//Core Package
const inquirer = require("inquirer");
const { consume_api_bccr } = require("../api/api_cr");

//Utils packages
const { get_indicator_info } = require("../utils/get_indicators");
const questions = [
  {
    type: "list",
    name: "operation",
    choices: ["Tipo de Cambio de Compra", "Tipo de Cambio de Venta"],
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
];

inquirer.prompt(questions).then(async (answers) => {
  // console.log(answers);
  const indicator = await get_indicator_info(answers.operation, answers.bank);
  consume_api_bccr(indicator);
});
