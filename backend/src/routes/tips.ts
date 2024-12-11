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
import { upvotePost } from "../tips/upvotePost";
import { downvotePost } from "../tips/downvotePost";
import { favouritePost } from "../tips/favouritePost";
import { commentPost } from "../tips/commentPost";

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

tipsRouter.put("/:userid/upvote", async (req, res) => {
  const ret = await upvotePost(req.params.userid, req.body.tipId, req.body.turnon);
  res.send(ret);
});

tipsRouter.put("/:userid/downvote", async (req, res) => {
  const ret = await downvotePost(req.params.userid, req.body.tipId, req.body.turnon);
  res.send(ret);
});

tipsRouter.put("/:userid/favourite", async (req, res) => {
  const ret = await favouritePost(req.params.userid, req.body.tipId, req.body.turnon);
  res.send(ret);
});

tipsRouter.post("/:userid/comment", async (req, res) => {
  const ret = await commentPost(req.params.userid, req.body.tipId, req.body.content);
  res.send(ret);
});

export default tipsRouter;
