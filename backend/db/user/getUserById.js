/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */
export const getUserById = async (client, userId) => {
  const filter = {
    _id: userId,
  };

  const coll = client.db("photo_quest").collection("users");
  const cursor = coll.find(filter);
  const result = await cursor.toArray();
  await client.close();
  return result;
};
