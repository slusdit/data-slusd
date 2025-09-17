export async function apiAuth() {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    username: process.env.NEXT_PUBLIC_FAST_API_USER,
    password: process.env.NEXT_PUBLIC_FAST_API_PASSWORD,
  });

  const requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_FAST_API_URL}/token/`,
      requestOptions
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.text();
    console.log('API Response:', result);
    
    // Parse the response to return the token
    try {
      const parsedResult = JSON.parse(result);
      return parsedResult;
    } catch (parseError) {
      // If response is not JSON, return as text
      return { token: result };
    }
  } catch (error) {
    console.error("API Auth error:", error);
    throw error;
  }
}