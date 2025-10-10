/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */
export const getSubmissionsByUserId = async (client, userId, skip, limit) => {
  const filter = {
    userId: userId,
  };

  const coll = client.db("photo_quest").collection("submissions");
  const cursor = coll.find(filter, { skip, limit });
  const result = await cursor.toArray();
  await client.close();
  return result;
};
