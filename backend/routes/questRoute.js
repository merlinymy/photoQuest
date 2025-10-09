import e from "express";
import { getQuestById } from "../db/quest/getQuestById.js";
import { mongoClient } from "../db/mogoClient.js";

export const questRouter = e.Router();

questRouter.use(e.static("frontend"));

questRouter.get("/:id", async (req, res) => {
  const client = await mongoClient();
  const data = await getQuestById(client, req.params.id);
  res.json({ data });
});
