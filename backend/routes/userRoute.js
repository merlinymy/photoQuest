import e from "express";
import { getIdbyEmail } from "../db/user/getIdbyEmail.js";
import { mongoClient } from "../db/mogoClient.js";
import { getUserById } from "../db/user/getUserById.js";

export const userRouter = e.Router();

userRouter.get("/id/:email", async (req, res) => {
  const client = await mongoClient();
  const email = req.params.email;
  const result = await getIdbyEmail(client, email);
  console.log(result[0]._id);
  res.json(result[0]._id);
});

userRouter.get("/:id", async (req, res) => {
  const client = await mongoClient();
  const id = req.params.id;
  const result = await getUserById(client, id);
  res.json(result);
});
