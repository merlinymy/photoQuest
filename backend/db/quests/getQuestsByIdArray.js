/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */
export const getQuestsByIdArray = async (client, array) => {
  const filter = {
    _id: {
      $in: array,
    },
  };

  const coll = client.db("photo_quest").collection("challenges");
  const cursor = coll.find(filter);
  const result = await cursor.toArray();
  await client.close();
  return result;
};
