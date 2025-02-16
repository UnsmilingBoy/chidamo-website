export function toPersianPrice(num) {
  let newNum = parseInt(num, 10);
  return new Intl.NumberFormat("fa-IR").format(newNum);
}

export function toPersianNumber(num) {
  let newNum = parseInt(num, 10);
  return new Intl.NumberFormat("fa-IR", { useGrouping: false }).format(newNum);
}
