const Banks = require("../indicators.json");
const { Entidades } = Banks;

function get_indicator_info(operation, bank) {
  const rawBank = Entidades.filter((entidad) => {
    return entidad.Nombre === bank;
  });
  //   console.log({ rawBank });
  //   console.log(rawBank[0][operation]);
  return rawBank[0][operation];
}

module.exports = { get_indicator_info };
