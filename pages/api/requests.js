import { createRequest, deleteRequest, getAllRequests } from "lib/requests";

function validateBody(body) {
  const { requestedBy, songId } = body;

  return [requestedBy, songId].every(Boolean);
}

async function post(req, res) {
  if (!validateBody(req.body))
    return res.status(422).json({
      error: "Missing parameters! Requireds -> requestedBy | songId",
    });

  const id = await createRequest(req.body);
  res.status(201).json({ id });
}

async function get(req, res) {
  const requests = await getAllRequests();
  res.status(200).json({ requests });
}

async function deleteMethod(req, res) {
  if (!req.body?.id)
    return res.status(422).json({
      error: "Missing id parameter",
    });

  await deleteRequest(req.body?.id);

  res.status(200).send("OK");
}

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case "POST":
        post(req, res);
        break;

      case "GET":
        get(req, res);
        break;

      case "DELETE":
        deleteMethod(req, res);
        break;

      default:
        res.status(405).json({ error: "Method Not Allowed" });
        break;
    }
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: "failed to load data" });
  }
}
