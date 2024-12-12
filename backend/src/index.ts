import "dotenv/config";
import express, { json } from "express";
import userRouter from "./routes/user";
import cors from "cors";
import testRouter from "./routes/test";
import tipsRouter from "./routes/tips";

const app = express();

app.use(cors());
app.use(json());

app.use("/users", userRouter);
app.use("/test", testRouter);
app.use("/tips", tipsRouter);

app.get("/", (req, res) => {
  res.send("hello world");
});

const port = process.env.LDPT_PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
