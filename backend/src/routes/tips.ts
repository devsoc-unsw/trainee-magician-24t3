import { Router } from "express";
import DB from "../db/db";
import { collection, getDocs } from "@firebase/firestore";

const tipsRouter = Router();

tipsRouter.get("/", async (req, res) => {
  const tips = (await getDocs(collection(DB, "tips"))).docs.map((d) =>
    d.data()
  );
  res.send({
    tips,
  });
});

export default tipsRouter;
