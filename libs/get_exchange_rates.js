const { make_request_api_cr } = require("./api_cr");
function getDates() {
  let full_date = new Date();
  let day = full_date.getDay();
  let month = full_date.getMonth();
  let year = full_date.getFullYear();

  return `${day}/${month}/${year}`;
}
async function get_exchange_rate(tipoCambio, tipoCambioPais) {
  if (tipoCambioPais === "Colombia") {
    return new Error("No se ha implementado aun");
  }
  if (tipoCambioPais === "Mexico") {
    return new Error("No se ha implementado aun");
  } else {
    if (tipoCambio == "Tipo de Cambio Compra") {
      make_request_api_cr("317", getDates(), getDates());
    }
    if (tipoCambio == "Tipo de Cambio Venta") {
      await make_request_api_cr("318", getDates(), getDates());
    } else {
      return new Error("No se ha implementado aun, pero seria un promedio");
    }
  }
}
module.exports = {
  get_exchange_rate,
};
