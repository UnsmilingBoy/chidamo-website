export async function POST(req) {
  try {
    const { username, password } = await req.json();
    const baseUrl = process.env.BASE_URL;
    const response = await fetch(baseUrl + "/wp-json/jwt-auth/v1/token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return new Response(
        JSON.stringify({ message: data.message || "Login failed" }),
        { status: 400 }
      );
    }

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Server error" }), {
      status: 500,
    });
  }
}
