import { MongoClient } from "mongodb";
export const mongoClient = async () => {
  const client = await MongoClient.connect("mongodb://localhost:27017");
  return client;
};
