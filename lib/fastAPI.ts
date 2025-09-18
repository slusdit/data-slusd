// lib/fastAPI.ts - Updated to use Next.js API routes as proxy

export async function apiAuth() {
  const requestOptions: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: process.env.NEXT_PUBLIC_FAST_API_USER,
      password: process.env.NEXT_PUBLIC_FAST_API_PASSWORD,
    }),
  };

  try {
    console.log("Authenticating through Next.js API proxy...");
    
    // Use your Next.js API route instead of direct FastAPI call
    const response = await fetch("/api/fastapi/token", requestOptions);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
    }

    const result = await response.json();
    console.log("Authentication successful");
    return result;
  } catch (error) {
    console.error("API Auth error:", error);
    throw error;
  }
}

export async function uploadIEP(files: File[], authToken: string) {
  const formData = new FormData();
  
  // Add each file to the FormData
  files.forEach((file) => {
    formData.append('file', file);
  });

  const requestOptions: RequestInit = {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${authToken}`,
    },
    body: formData,
  };
  
  try {
    console.log("Uploading through Next.js API proxy...");
    
    // Use your Next.js API route instead of direct FastAPI call
    const response = await fetch("/api/fastapi/upload", requestOptions);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
    }
    
    const result = await response.json();
    console.log("Upload successful");
    return result;
  } catch (error) {
    console.error("API upload error:", error);
    throw error;
  }
}