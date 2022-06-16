// import { Client, Entity, Schema, Repository } from "redis-om";

// const client = new Client();

// async function connect() {
//   if (!client.isOpen()) {
//     await client.open(process.env.REDIS_URL);
//   }
// }

// class Request extends Entity {}

// let schema = new Schema(
//   Request,
//   {
//     requestedBy: { type: "string" },
//     description: { type: "string" },
//     songId: { type: "string" },
//   },
//   {
//     dataStructure: "JSON",
//   }
// );

// export async function createRequest(data) {
//   await connect();

//   const repository = client.fetchRepository(schema);

//   const songRequest = repository.createEntity(data);

//   const id = await repository.save(songRequest);

//   const ttlInSeconds = 12 * 60 * 60; // 12 hours

//   await repository.expire(id, ttlInSeconds);

//   return id;
// }

// export async function deleteRequest(id) {
//   await connect();

//   const repository = new Repository(schema, client);
//   return repository.remove(id);
// }

// export async function createRequestsIndex() {
//   await connect();

//   const repository = new Repository(schema, client);
//   await repository.createIndex();
// }

// export async function getAllRequests() {
//   await connect();

//   const repository = new Repository(schema, client);

//   const requests = await repository.search().return.all();

//   return requests;
// }
