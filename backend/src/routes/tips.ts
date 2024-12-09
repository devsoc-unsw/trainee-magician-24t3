import { Router } from "express";
import DB from "../db/db";
import {
  collection,
  doc,
  getDocs,
  getDoc,
  deleteDoc,
} from "@firebase/firestore";
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

tipsRouter.get("/:id", async (req, res) => {
  const docRef = doc(DB, "tips", req.params.id);
  const docSnapshot = await getDoc(docRef);
  const ret = docSnapshot.data();

  res.send(ret);
});

tipsRouter.delete("/:id", async (req, res) => {
  const docRef = doc(DB, "tips", req.params.id);
  const ret = await deleteDoc(docRef);
  res.send({});
});

export default tipsRouter;
