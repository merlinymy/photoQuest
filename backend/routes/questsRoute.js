import e from "express";
import { mongoClient } from "../db/mongoClient.js";
import { getCategories } from "../db/quests/getCategories.js";
import { getPopular } from "../db/quests/getPopular.js";
import { getQuestsByCreatorId } from "../db/quests/getQuestsByUserId.js";
import { getQuestsByIdArray } from "../db/quests/getQuestsByIdArray.js";
import { normalizeId } from "../db/utils/normalizeId.js";

export const questsRouter = e.Router();
questsRouter.use(e.static("../../frontend"));

// delete quest by questId
questsRouter.delete("/:id", async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ error: "Quest ID is required" });
    }
    const client = await mongoClient();

    const questId = normalizeId(req.params.id);

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

questsRouter.post("/joined/questIdArray", async (req, res) => {
  const userId = normalizeId(req.body.userId);
  const questIdArray = req.body.questIdArray;

  if (!userId || !Array.isArray(questIdArray)) {
    return res.status(400).json({ error: "Invalid request data" });
  }

  const client = await mongoClient();
  const data = await client
    .db("photo_quest")
    .collection("challenges")
    .find({ _id: { $in: questIdArray.map((id) => normalizeId(id)) } })
    .sort({ createdAt: -1 })
    .toArray();
  res.json(data);
});

questsRouter.get("/:userId", async (req, res) => {
  const userId = req.params.userId;
  const client = await mongoClient();
  const data = await client
    .db("photo_quest")
    .collection("challenges")
    .find({ creatorId: userId })
    .sort({ createdAt: -1 })
    .toArray();
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
