import e from "express";
import { getSubmissionsByUserId } from "../db/sumbissions/getSubmissionsByUserId.js";
import { mongoClient } from "../db/mogoClient.js";

export const submissionRoute = e.Router();
submissionRoute.get("/:userId", async (req, res) => {
  const client = await mongoClient();
  const userId = req.params.userId;
  const { skip, limit } = req.query;
  const data = await getSubmissionsByUserId(client, userId, +skip, +limit);
  res.json(data);
});
