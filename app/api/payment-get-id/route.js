import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();

    const bankApi = process.env.BANK_API;
    const redirectUrl = process.env.REDIRECT_URL;
    const bankGetUrl = process.env.BANK_GET_URL;

    const formData = new FormData();
    formData.append("api", bankApi);
    formData.append("amount", body.amount);
    formData.append("redirect", redirectUrl);
    formData.append("factorId", body.factorId);

    const response = await fetch(bankGetUrl, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("BANK API Error:", {
        status: response.status,
        statusText: response.statusText,
        response: data,
      });
      return NextResponse.json({ error: data }, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("getting paymet id failed:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
