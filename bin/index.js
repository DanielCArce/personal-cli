#! /usr/bin/env node
require("dotenv").config();
const inquirer = require("inquirer");

const { get_exchange_rate } = require("../libs/get_exchange_rates");

//importing libs
const {} = require("../libs/get_exchange_rates");

let questions = [
  {
    type: "list",
    name: "tipoCambio",
    message: "Seleciona que tipo de cambio",
    choices: ["Tipo de Cambio Compra", "Tipo de Cambio Venta"],
  },
  {
    type: "list",
    name: "tipoCambioPais",
    message: "Seleciona que tipo de cambio",
    choices: ["Costa Rica", "Colombia", "Mexico"],
  },
];

inquirer.prompt(questions).then(async (answers) => {
  console.log({ answers });
  await get_exchange_rate(answers["tipoCambio"], answers["tipoCambioPais"]);
});
