import "dotenv/config";
import express from "express";
import { questsRouter } from "./routes/questsRoute.js";
import { questRouter } from "./routes/questRoute.js";
import { userRouter } from "./routes/userRoute.js";
import { submissionRoute } from "./routes/submissionRoute.js";
import { commentsRoute } from "./routes/commentsRoute.js";

const app = express();
app.use(express.json());
app.use(express.static("frontend"));
// Public runtime config for frontend (do not commit secrets; load from env)
app.get("/env.json", (_req, res) => {
  res.json({
    SUPABASE_URL: process.env.SUPABASE_URL || "",
    SUPABASE_KEY: process.env.SUPABASE_KEY || "",
  });
});
app.get("/env.js", (_req, res) => {
  res.setHeader("Content-Type", "application/javascript");
  res.send(
    `window.__PUBLIC_CONFIG__ = { SUPABASE_URL: ${JSON.stringify(
      process.env.SUPABASE_URL || "",
    )}, SUPABASE_KEY: ${JSON.stringify(process.env.SUPABASE_KEY || "")} };`,
  );
});
app.use("/quests", questsRouter);
app.use("/quest", questRouter);
app.use("/user", userRouter);
app.use("/submissions", submissionRoute);
app.use("/comments", commentsRoute);
app.listen(3004, () => {
  console.log("server running on http://localhost:3004");
});
