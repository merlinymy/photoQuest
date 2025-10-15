/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */
import { normalizeId } from "../utils/normalizeId.js";

export const getQuestsByIdArray = async (client, array) => {
  const ids = Array.isArray(array) ? array.map((v) => normalizeId(v)) : [];
  const filter = {
    _id: {
      $in: ids,
    },
  };

  const coll = client.db("photo_quest").collection("challenges");
  const cursor = coll.find(filter);
  const result = await cursor.toArray();
  await client.close();
  return result;
};
