const BASE_URL = 'http://20.244.56.144/evaluation-service';

// ✅ Latest valid token (from your message)
const AUTH_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQ5MDE0NjcxLCJpYXQiOjE3NDkwMTQzNzEsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjkxMWE1YTM4LTA3NDYtNGE2Ny04OTA1LWI1OWFhNzExZTU0NiIsInN1YiI6Im1heXVybG9tYXRlMjAwNUBnbWFpbC5jb20ifSwiZW1haWwiOiJtYXl1cmxvbWF0ZTIwMDVAZ21haWwuY29tIiwibmFtZSI6Im1heXVyIGxvbWF0ZSIsInJvbGxObyI6IjcyMjMyODIwZyIsImFjY2Vzc0NvZGUiOiJLUmpVVVUiLCJjbGllbnRJRCI6IjkxMWE1YTM4LTA3NDYtNGE2Ny04OTA1LWI1OWFhNzExZTU0NiIsImNsaWVudFNlY3JldCI6IlFteXBwcm5jbnl0dXVieXcifQ.uwFp42d0lx0NgEjiYMag-vg569f0ioNdZlc4hPXb9pM';

export async function fetchStocksList() {
  try {
    const res = await fetch(`${BASE_URL}/stocks`, {
      headers: {
        'Authorization': AUTH_TOKEN,
        'Content-Type': 'application/json',
      }
    });

    if (!res.ok) {
      throw new Error(`Error ${res.status}: ${res.statusText}`);
    }

    return await res.json();
  } catch (err) {
    console.error("Failed to fetch stocks list:", err);
    return { stocks: {} };
  }
}

export async function fetchStockHistory(ticker, minutes) {
  try {
    const res = await fetch(`${BASE_URL}/stocks/${ticker}/history?interval=${minutes}`, {
      headers: {
        'Authorization': AUTH_TOKEN,
        'Content-Type': 'application/json',
      }
    });

    if (!res.ok) {
      throw new Error(`Error ${res.status}: ${res.statusText}`);
    }

    return await res.json();
  } catch (err) {
    console.error(`Failed to fetch history for ${ticker}:`, err);
    return { prices: [] };
  }
}
