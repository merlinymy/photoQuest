import e from "express";
import { mongoClient } from "../db/mogoClient.js";
import { getCategories } from "../db/quests/getCategories.js";
import { getPopular } from "../db/quests/getPopular.js";
import { getQuestsByCreatorId } from "../db/quests/getQuestsByUserId.js";
import { getQuestsByIdArray } from "../db/quests/getQuestsByIdArray.js";

export const questsRouter = e.Router();
questsRouter.use(e.static("../../frontend"));

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
