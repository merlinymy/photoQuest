/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */
export const getQuestsByCreatorId = async (client, cid) => {
  const agg = [
    {
      $match: {
        creatorId: cid,
      },
    },
  ];

  const coll = client.db("photo_quest").collection("challenges");
  const cursor = coll.aggregate(agg);
  const result = await cursor.toArray();
  await client.close();
  return result;
};
