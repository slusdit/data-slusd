export function apiAuth() {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "••••••");

  const raw = JSON.stringify({
    username: process.env.NEXT_PUBLIC_FAST_API_USER,
    password: process.env.NEXT_PUBLIC_FAST_API_PASSWORD,
  });
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  const response = fetch(
    `${process.env.NEXT_PUBLIC_FAST_API_URL}/token/`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
  return response;
}
