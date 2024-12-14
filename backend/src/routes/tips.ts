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
  try {
    const tipsCollection = collection(DB, "tips");
    const tipsSnapshot = await getDocs(tipsCollection);
    
    const tips = tipsSnapshot.docs.map(doc => ({
      tipId: doc.id,
      ...doc.data()
    }));

    res.json({ tips });
  } catch (error) {
    console.error("Error fetching tips:", error);
    res.status(500).json({ error: "Failed to fetch tips" });
  }
});

tipsRouter.post("/", async (req, res) => {
  try {
    const ret = await createTip(
      req.body.title,
      req.body.type,
      req.body.authorId,
      req.body.description,
      req.body.content
    );

    res.send(ret);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
});

tipsRouter.get("/:id", async (req, res) => {
  try {
    const docRef = doc(DB, "tips", req.params.id);
    const docSnapshot = await getDoc(docRef);
    if (!docSnapshot.exists()) {
      throw new Error("Tip does not exist");
    }
    const tipData = docSnapshot.data();
    
    res.send({
      tipId: docSnapshot.id,
      ...tipData
    });
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
});

tipsRouter.delete("/:id", async (req, res) => {
  try {
    const docRef = doc(DB, "tips", req.params.id);
    const ret = await deleteDoc(docRef);

    res.send({});
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
});

tipsRouter.put("/:userid/upvote", async (req, res) => {
  try {
    const ret = await upvotePost(
      req.params.userid,
      req.body.tipId,
      req.body.turnon
    );
  
    res.send(ret);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
});

tipsRouter.put("/:userid/downvote", async (req, res) => {
  try {
    const ret = await downvotePost(
      req.params.userid,
      req.body.tipId,
      req.body.turnon
    );
  
    res.send(ret);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
});

tipsRouter.put("/:userid/favourite", async (req, res) => {
  try {
    const ret = await favouritePost(
      req.params.userid,
      req.body.tipId,
      req.body.turnon
    );
  
    res.send(ret);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
});

tipsRouter.post("/:userid/comment", async (req, res) => {
  try {
    const ret = await commentPost(
      req.params.userid,
      req.body.tipId,
      req.body.content
    );
    
    res.send(ret);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
});

export default tipsRouter;
