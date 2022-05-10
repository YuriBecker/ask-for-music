import {
  createSongRequest,
  deleteSongRequest,
  getAllSongRequests,
} from "lib/redis";

function validateBody(body) {
  const { requestedBy, artist, song } = body;

  return [requestedBy, artist, song].every(Boolean);
}

export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      if (!validateBody(req.body))
        return res.status(422).json({
          error: "Missing parameters! Requireds -> requestedBy | artist | song",
        });

      const id = await createSongRequest(req.body);
      res.status(200).json({ id });
    }

    if (req.method === "GET") {
      const requests = await getAllSongRequests();
      res.status(200).json({ requests });
    }

    if (req.method === "DELETE") {
      if (!req.body?.id)
        return res.status(422).json({
          error: "Missing id parameter",
        });

      await deleteSongRequest(req.body?.id);

      res.status(200).send("OK");
    }

    return res.status(405).json({ error: "Method Not Allowed" });
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: "failed to load data" });
  }
}
