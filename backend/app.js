import express from "express";
import { questsRouter } from "./routes/questsRoute.js";
import { questRouter } from "./routes/questRoute.js";
import { userRouter } from "./routes/userRoute.js";
import { submissionRoute } from "./routes/submissionRoute.js";
import { commentsRoute } from "./routes/commentsRoute.js";

const app = express();
app.use(express.json());
app.use(express.static("frontend"));
app.use("/quests", questsRouter);
app.use("/quest", questRouter);
app.use("/user", userRouter);
app.use("/submissions", submissionRoute);
app.use("/comments", commentsRoute);
app.listen(3004, () => {
  console.log("server running on http://localhost:3004");
});
