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

export async function uploadIEP(files: File[], authToken: string) {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${authToken}`);
    // Don't set Content-Type manually - let the browser set it with the boundary for multipart/form-data

    // Create FormData instead of JSON
    const formData = new FormData();
    
    // Add each file to the FormData
    files.forEach((file, index) => {
      formData.append('file', file); // Use 'files' as the field name (adjust if your API expects different)
    });

    const requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: formData, // Use FormData instead of JSON
      redirect: "follow",
    };
    
    try {
        const response = await fetch(
        `${process.env.NEXT_PUBLIC_FAST_API_URL}/sped/uploadIepAtAGlance/`,
        requestOptions
        );
        if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
        const result = await response.text();
        return result;
    } catch (error) {
        console.error("API upload error:", error);
        throw error;
    }
}