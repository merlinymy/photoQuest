import e from "express";
import { mongoClient } from "../db/mogoClient.js";
import { getCategories } from "../db/quests/getCategories.js";
import { getPopular } from "../db/quests/getPopular.js";
import { getQuestsByCreatorId } from "../db/quests/getQuestsByUserId.js";
import { getQuestsByIdArray } from "../db/quests/getQuestsByIdArray.js";
import { ObjectId } from "mongodb";

export const questsRouter = e.Router();
questsRouter.use(e.static("../../frontend"));

// delete quest by questId
questsRouter.delete("/:id", async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ error: "Quest ID is required" });
    }
    const client = await mongoClient();

    const questId =
      req.params.id.length === 24 ? new ObjectId(req.params.id) : req.params.id;

    const result = await client
      .db("photo_quest")
      .collection("challenges")
      .deleteOne({ _id: questId });
    res.json({ result });
  } catch (error) {
    console.error("Error deleting quest:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

questsRouter.get("/categories", async (req, res) => {
  const client = await mongoClient();
  const data = await getCategories(client);
  res.json({ data });
});

questsRouter.get("/popular", async (req, res) => {
  const client = await mongoClient();
  const data = await getPopular(client);
  res.json({ data });
});

questsRouter.post("/joined/byIdArr", async (req, res) => {
  const idArr = req.body.tags;
  console.log("idArr", idArr);
  const client = await mongoClient();
  const data = await getQuestsByIdArray(client, idArr);
  res.json(data);
});

questsRouter.get("/:userId", async (req, res) => {
  const userId = req.params.userId;
  const client = await mongoClient();
  const data = await getQuestsByCreatorId(client, userId);
  res.json({ data });
});

questsRouter.post("/newQuest", async (req, res) => {
  // Endpoint to create a new quest
  const {
    title,
    description,
    creatorId,
    xpRewards,
    endAt,
    tags,
    counters,
    imageUrl,
    tip,
  } = req.body;
  console.log({
    title,
    description,
    creatorId,
    xpRewards,
    endAt,
    tags,
    counters,
    imageUrl,
    tip,
  });
  const client = await mongoClient();
  try {
    await client.db("photo_quest").collection("challenges").insertOne({
      title,
      description,
      creatorId,
      xpRewards,
      endAt,
      tags,
      counters,
      imageUrl,
      tip,
    });
    res
      .status(201)
      .json({ status: "success", message: "Quest created successfully" });
  } catch (error) {
    console.error("Error inserting new quest:", error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
    return;
  } finally {
    await client.close();
  }
});
