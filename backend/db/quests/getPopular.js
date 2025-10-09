export const getPopular = async (client) => {
  /*
   * Requires the MongoDB Node.js Driver
   * https://mongodb.github.io/node-mongodb-native
   */

  const agg = [
    {
      $sort: {
        "counters.submissions": -1,
      },
    },
    {
      $limit: 9,
    },
  ];
  const coll = client.db("photo_quest").collection("challenges");
  const cursor = coll.aggregate(agg);
  const result = await cursor.toArray();
  return result;
};
