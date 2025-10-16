/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */

export const getSubmissionsByQuestId = async (
  client,
  questId,
  skip = 0,
  limit = 20,
) => {
  const filter = {
    challengeId: questId,
  };

  const coll = client.db("photo_quest").collection("submissions");
  const cursor = coll.find(filter, { skip, limit });
  const result = await cursor.toArray();
  await client.close();
  return result;
};
