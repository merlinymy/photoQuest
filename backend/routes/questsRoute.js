import e from "express";
import { mongoClient } from "../db/mogoClient.js";
import { getCategories } from "../db/quests/getCategories.js";
import { getPopular } from "../db/quests/getPopular.js";

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
