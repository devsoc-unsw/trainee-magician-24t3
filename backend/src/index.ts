import "dotenv/config";
import express, { json } from "express";
import userRouter from "./routes/user";
import cors from "cors";
import testRouter from "./routes/test";
import tipsRouter from "./routes/tips";

const app = express();

app.use(cors());
app.use(json());

app.use("/user", userRouter);
app.use("/test", testRouter);
app.use("/tips", tipsRouter);

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(process.env.LDPT_PORT);
