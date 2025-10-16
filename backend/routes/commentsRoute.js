import e from "express";

import { mongoClient } from "../db/mongoClient.js";
import { normalizeId } from "../db/utils/normalizeId.js";

export const commentsRoute = e.Router();

// get comments by submissionId with pagination
commentsRoute.get("/bySubmissionId/:submissionId", async (req, res) => {
  const client = await mongoClient();
  const submissionId = normalizeId(req.params.submissionId);

  const data = await client
    .db("photo_quest")
    .collection("comments")
    .find({ submissionId })
    .skip(+req.query.skip || 0)
    .limit(+req.query.limit || 1)
    .toArray();
  res.json(data);
});

// post a comment
commentsRoute.post("/", async (req, res) => {
  const client = await mongoClient();
  const { submissionId, userId, body } = req.body;
  const result = await client
    .db("photo_quest")
    .collection("comments")
    .insertOne({
      submissionId: normalizeId(submissionId),
      userId: normalizeId(userId),
      body,
      createdAt: new Date(),
    });
  res.json({ result });
  client.close();
});

// delete a comment by id
commentsRoute.delete("/:id", async (req, res) => {
  const client = await mongoClient();
  const id = normalizeId(req.params.id);
  const result = await client
    .db("photo_quest")
    .collection("comments")
    .deleteOne({ _id: id });
  res.json({ result });
  client.close();
});

// update a comment by id
commentsRoute.put("/:id", async (req, res) => {
  const client = await mongoClient();
  const id = normalizeId(req.params.id);
  const { body } = req.body;
  const result = await client
    .db("photo_quest")
    .collection("comments")
    .updateOne({ _id: id }, { $set: { body } });
  res.json({ result });
  client.close();
});
