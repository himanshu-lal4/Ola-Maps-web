// pages/api/getToken.js
import fetch from "node-fetch";

export default async function handler(req, res) {
  try {
    const response = await fetch(
      "https://account.olamaps.io/realms/olamaps/protocol/openid-connect/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          grant_type: "client_credentials",
          scope: "openid",
          client_id: "cf220934-619a-4c4d-815c-5cec174e3e35",
          client_secret: "OKQW09r6Yir1SAXpyUWLicx5jAW3XpA0",
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch access token");
    }

    const data = await response.json();
    res.status(200).json({ accessToken: data.access_token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
