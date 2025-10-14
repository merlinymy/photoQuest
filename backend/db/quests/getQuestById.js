/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */
import { ObjectId } from "mongodb";
export async function getQuestById(client, questId) {
  const id = questId.length === 24 ? new ObjectId(questId) : questId;
  const agg = [
    {
      $match: {
        _id: id,
      },
    },
  ];

  const coll = client.db("photo_quest").collection("challenges");
  const cursor = coll.aggregate(agg);
  const result = await cursor.toArray();
  await client.close();
  return result;
}
