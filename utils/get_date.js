export function get_current_date(divisor) {
  const date = new Date();
  console.log(divisor);
  const day = validate_length(date.getDate());
  const month = validate_length(date.getMonth());
  const year = validate_length(date.getFullYear());
  return `${day}${divisor}${month}${divisor}${year}`;
}
function validate_length(date) {
  const d = date.toString();
  if (d.length < 1) {
    return "0" + d;
  }
  return d;
}
