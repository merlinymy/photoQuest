/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */
export const getSubmissionsByUserId = async (client, userId, skip = 0, limit = 10) => {
  const filter = {
    userId: userId,
  };

  const coll = client.db("photo_quest").collection("submissions");
  const cursor = coll
    .find(filter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);
  const result = await cursor.toArray();
  await client.close();
  return result;
};
