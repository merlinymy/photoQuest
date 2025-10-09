/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */

export const getCategories = async (client) => {
  const agg = [
    {
      $unwind: "$tags",
    },
    {
      $group: {
        _id: "$tags",
        count: {
          $sum: 1,
        },
      },
    },
  ];
  const coll = client.db("photo_quest").collection("challenges");
  const cursor = coll.aggregate(agg);
  const result = await cursor.toArray();
  await client.close();

  return result;
};
