import express from "express";
import cors from "cors";
const app = express();
import router from "./routes";

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());
app.use("/task", router);

export default app;
