import express from "express";
import { questsRouter } from "./routes/questsRoute.js";
import { questRouter } from "./routes/questRoute.js";

const app = express();
app.use(express.static("frontend"));
app.use("/quests", questsRouter);
app.use("/quest", questRouter);
app.listen(3000, () => {
  console.log("server running on http://localhost:3000");
});
