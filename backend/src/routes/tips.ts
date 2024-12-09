import { Router } from "express";
import DB from "../db/db";
import { collection, getDocs } from "@firebase/firestore";
import { createTip } from "../tips/createTip";

const tipsRouter = Router();

tipsRouter.get("/", async (req, res) => {
  const tips = (await getDocs(collection(DB, "tips"))).docs.map((d) =>
    d.data()
  );
  res.send({
    tips,
  });
});

tipsRouter.post("/", async (req, res) => {
  const ret = await createTip(
    req.body.title,
    req.body.type,
    req.body.authorId,
    req.body.description,
    req.body.content
  );

  res.send(ret);
});

export default tipsRouter;
