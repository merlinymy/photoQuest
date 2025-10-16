import e from "express";
import { getSubmissionsByUserId } from "../db/submissions/getSubmissionsByUserId.js";
import { mongoClient } from "../db/mongoClient.js";
import { getSubmissionsByQuestId } from "../db/submissions/getSubmissionsByQuestId.js";
import { normalizeId } from "../db/utils/normalizeId.js";

export const submissionRoute = e.Router();
// get submissions by userId
submissionRoute.get("/:userId", async (req, res) => {
  const client = await mongoClient();
  const userId = req.params.userId;
  const data = await getSubmissionsByUserId(client, userId);
  res.json(data);
});

// get submissions by questId
submissionRoute.get("/byQuestId/:questId", async (req, res) => {
  const client = await mongoClient();
  const questId = normalizeId(req.params.questId);
  const data = await getSubmissionsByQuestId(client, questId);
  res.json(data);
});

// get a qeust by id
submissionRoute.get("/byId/:id", async (req, res) => {
  const client = await mongoClient();
  const id = normalizeId(req.params.id);
  const data = await client
    .db("photo_quest")
    .collection("submissions")
    .findOne({ _id: id });
  res.json(data);
});

// post a submission
submissionRoute.post("/", async (req, res) => {
  const client = await mongoClient();
  console.log("req.body", req.body);
  const { challengeId, userId, title, imageUrl, counters, exif } = req.body;
  const result = await client
    .db("photo_quest")
    .collection("submissions")
    .insertOne({
      challengeId: normalizeId(challengeId),
      userId: normalizeId(userId),
      title,
      imageUrl,
      counters,
      exif,
      createdAt: new Date(),
      // const result = await client.db("photo_quest").collection("submissions").insertOne({
      // challengeId
    });
  res.json({ result });
});

// delete a submission by id
submissionRoute.delete("/:id", async (req, res) => {
  const client = await mongoClient();
  const id = normalizeId(req.params.id);
  const result = await client
    .db("photo_quest")
    .collection("submissions")
    .deleteOne({ _id: id });
  res.json({ result });
});

// update a submission by id
submissionRoute.put("/:id", async (req, res) => {
  const client = await mongoClient();
  const id = normalizeId(req.params.id);
  const { title, imageUrl, exif } = req.body;
  const result = await client
    .db("photo_quest")
    .collection("submissions")
    .updateOne({ _id: id }, { $set: { title, imageUrl, exif } });
  res.json({ result });
});
