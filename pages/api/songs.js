import { addSong, deleteSong, getAllSongs } from "lib/redis";

function validateBody(body) {
  const { name, genre } = body;

  return [name, genre].every(Boolean);
}

export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      if (!validateBody(req.body))
        return res.status(422).json({
          error: "Missing parameters! Requireds -> name | genre",
        });

      const id = await addSong(req.body);
      res.status(201).json({ id });
    }

    if (req.method === "GET") {
      const requests = await getAllSongs();
      res.status(200).json({ requests });
    }

    if (req.method === "DELETE") {
      if (!req.body?.id)
        return res.status(422).json({
          error: "Missing id parameter",
        });

      await deleteSong(req.body?.id);

      res.status(200).send("OK");
    }

    return res.status(405).json({ error: "Method Not Allowed" });
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: "failed to load data" });
  }
}
