import e from "express";
import { getSubmissionsByUserId } from "../db/sumbissions/getSubmissionsByUserId.js";
import { mongoClient } from "../db/mogoClient.js";
import { getSubmissionsByQuestId } from "../db/sumbissions/getSubmissionsByQuestId.js";

export const submissionRoute = e.Router();
// get submissions by userId
submissionRoute.get("/:userId", async (req, res) => {
  const client = await mongoClient();
  const userId = req.params.userId;
  const { skip, limit } = req.query;
  const data = await getSubmissionsByUserId(client, userId, +skip, +limit);
  res.json(data);
});

// get submissions by questId
submissionRoute.get("/byQuestId/:questId", async (req, res) => {
  const client = await mongoClient();
  const questId = req.params.questId;
  console.log(questId);
  const { skip, limit } = req.query;
  const data = await getSubmissionsByQuestId(client, questId, +skip, +limit);
  console.log("questId, skip and limit", questId, skip, limit);
  res.json(data);
});
