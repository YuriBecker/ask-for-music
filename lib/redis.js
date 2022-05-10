import { Client, Entity, Schema, Repository } from "redis-om";

const client = new Client();

async function connect() {
  if (!client.isOpen()) {
    await client.open(process.env.REDIS_URL);
  }
}

class SongRequest extends Entity {}

let schema = new Schema(
  SongRequest,
  {
    requestedBy: { type: "string" },
    description: { type: "string" },
    artist: { type: "string" },
    song: { type: "string", textSearch: true },
    url: { type: "string" },
  },
  {
    dataStructure: "JSON",
  }
);

export async function getAuthCode() {
  await connect();

  const code = await client.get("auth-code");

  return code;
}

export async function createSongRequest(data) {
  await connect();

  const repository = client.fetchRepository(schema);

  const songRequest = repository.createEntity(data);

  const id = await repository.save(songRequest);
  return id;
}

export async function getSongRequest(id) {
  await connect();

  const repository = new Repository(schema, client);
  return repository.fetch(id);
}

export async function deleteSongRequest(id) {
  await connect();

  const repository = new Repository(schema, client);
  return repository.remove(id);
}

export async function createIndex() {
  await connect();

  const repository = new Repository(schema, client);
  await repository.createIndex();
}

export async function getAllSongRequests() {
  await connect();

  const repository = new Repository(schema, client);

  const requests = await repository.search().return.all();

  return requests;
}
