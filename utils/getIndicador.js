import indicadores from "../indicators.json" assert { type: "json" };
const { Entidades } = indicadores;
async function getIndicador(op, bnk) {
  return Entidades.filter((entity) => {
    return entity.Nombre === bnk;
  }).map((entity) => {
    return entity[op];
  })[0];
}
export default getIndicador;
//getIndicador("Tipo de Cambio de Compra", "Banco Central de Costa Rica");
