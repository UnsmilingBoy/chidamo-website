export default function toPersianNumber(num) {
  let newNum = parseInt(num, 10);
  return new Intl.NumberFormat("fa-IR").format(newNum);
}
