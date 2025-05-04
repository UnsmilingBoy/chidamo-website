export async function fetchWithRetry(
  url,
  options = {},
  retries = 3,
  backoff = 2000
) {
  try {
    const res = await fetch(url, options);
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(
        `HTTP error! Status: ${res.status}. Details: ${JSON.stringify(
          errorData
        )}`
      );
    }
    return res;
  } catch (err) {
    if (retries > 0) {
      console.warn(
        `Fetch failed. Retrying in ${
          backoff / 1000
        }s... (${retries} retries left)`
      );
      await new Promise((res) => setTimeout(res, backoff));
      return fetchWithRetry(url, options, retries - 1, backoff);
    } else {
      console.error("All retries failed:", err);
      throw err;
    }
  }
}
