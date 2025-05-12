export const SHIPPING_PRICE = 80000;
export function bankUrl(bankId) {
  return `https://bitpay.ir/payment/gateway-${bankId}-get`;
}
