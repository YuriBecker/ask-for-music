import { createRequestsIndex } from "lib/requests";

export default async function handler(req, res) {
  await createRequestsIndex();

  res.status(200).send("ok");
}
