export async function GET(req) {
  return handleRedirect(req);
}

export async function POST(req) {
  return handleRedirect(req);
}

async function handleRedirect(req) {
  let transId = "";
  let idGet = "";
  let factorId = "";
  const { searchParams } = new URL(req.url);
  transId = searchParams.get("trans_id") || "";
  idGet = searchParams.get("id_get") || "";
  factorId = searchParams.get("factorId") || "";

  // const { origin } = new URL(req.url);
  const redirectUrl = `https://www.chidamo.com/order-result/${factorId}?trans_id=${transId}&id_get=${idGet}`;

  return Response.redirect(redirectUrl, 302);
}
