/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */

export const getIdbyEmail = async (client, email) => {
  const filter = {
    email: email,
  };
  const projection = {
    _id: 1,
    email: 1,
  };

  const coll = client.db("photo_quest").collection("users");
  const cursor = coll.find(filter, { projection });
  const result = await cursor.toArray();
  await client.close();
  return result;
};
