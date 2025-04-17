export async function getUserInfo(id) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await fetch(baseUrl + `/api/userinfo/${id}`);
  const data = await res.json();
  return data;
}

export async function getUserOrders(id) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await fetch(baseUrl + `/api/orders?customer=${id}`);
  const orders = await res.json();
  return orders;
}
