import { Client, Entity, Schema, Repository } from "redis-om";

const client = new Client();

async function connect() {
  if (!client.isOpen()) {
    await client.open(process.env.REDIS_URL);
  }
}

class Song extends Entity {}

let schema = new Schema(
  Song,
  {
    artist: { type: "string" },
    name: { type: "string", textSearch: true },
    genre: { type: "string" },
  },
  {
    dataStructure: "JSON",
  }
);

export async function addSong(data) {
  await connect();

  const repository = client.fetchRepository(schema);

  const song = repository.createEntity(data);

  const id = await repository.save(song);
  return id;
}

export async function deleteSong(id) {
  await connect();

  const repository = new Repository(schema, client);
  return repository.remove(id);
}

export async function getAllSongs() {
  await connect();

  const repository = new Repository(schema, client);

  const songs = await repository.search().return.all();

  return songs;
}

export async function getAuthCode() {
  await connect();

  const code = await client.get("auth-code");

  return code;
}

export async function createIndex() {
  await connect();

  const repository = new Repository(schema, client);
  await repository.createIndex();
}

class Request extends Entity {}

let schema2 = new Schema(
  Request,
  {
    requestedBy: { type: "string" },
    description: { type: "string" },
    songId: { type: "string" },
  },
  {
    dataStructure: "JSON",
  }
);

export async function createRequest(data) {
  await connect();

  const repository = client.fetchRepository(schema2);

  const songRequest = repository.createEntity(data);

  const id = await repository.save(songRequest);

  const ttlInSeconds = 12 * 60 * 60; // 12 hours

  await repository.expire(id, ttlInSeconds);

  return id;
}

export async function deleteRequest(id) {
  await connect();

  const repository = new Repository(schema2, client);
  return repository.remove(id);
}

export async function createRequestsIndex() {
  await connect();

  const repository = new Repository(schema2, client);
  await repository.createIndex();
}

export async function getAllRequests() {
  await connect();

  const repository = new Repository(schema2, client);

  const requests = await repository.search().return.all();

  return requests;
}
