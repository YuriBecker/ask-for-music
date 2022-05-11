import { getAuthCode } from "lib/songs";

export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      const { code } = req.body;

      if (!code)
        return res.status(422).json({
          error: "Missing parameters! Requireds -> code",
        });

      const authCode = await getAuthCode();

      if (authCode === code) return res.status(201).send("OK");

      return res.status(401).json({ error: "Invalid auth code" });
    }

    return res.status(405).json({ error: "Method Not Allowed" });
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: "failed to load data" });
  }
}
