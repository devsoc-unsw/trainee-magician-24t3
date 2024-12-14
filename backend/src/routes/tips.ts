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

    const tips = tipsSnapshot.docs.map((doc) => ({
      tipId: doc.id,
      ...doc.data(),
    }));

    res.json({ tips });
  } catch (error) {
    console.error("Error fetching tips:", error);
    res.status(500).json({ error: "Failed to fetch tips" });
  }
});

tipsRouter.post("/", async (req, res) => {
  console.log(`[${new Date().toISOString()}] Attempting to create new tip:`, {
    title: req.body.title,
    type: req.body.type,
    authorId: req.body.authorId,
    tagsCount: req.body.tags?.length || 0,
  });

  try {
    const ret = await createTip(
      req.body.title,
      req.body.type,
      req.body.authorId,
      req.body.description,
      req.body.content,
      req.body.tags || []
    );

    console.log(`[${new Date().toISOString()}] Successfully created tip:`, {
      tipId: ret.tipId,
      authorId: req.body.authorId,
      type: req.body.type,
    });

    res.send(ret);
  } catch (e: any) {
    console.error(`[${new Date().toISOString()}] Failed to create tip:`, {
      error: e.message,
      authorId: req.body.authorId,
      type: req.body.type,
    });

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

    // Get the tip author's information
    const tipAuthorRef = doc(DB, "users", tipData.authorId);
    const tipAuthorSnapshot = await getDoc(tipAuthorRef);
    const tipAuthorData = tipAuthorSnapshot.exists() ? tipAuthorSnapshot.data() : null;

    const responseData = {
      ...tipData,
      tipId: docSnapshot.id,
      author: tipAuthorData ? {
        name: `${tipAuthorData.firstName} ${tipAuthorData.lastName}`,
        profilePic: tipAuthorData.profileUrl,
        firstName: tipAuthorData.firstName,
        lastName: tipAuthorData.lastName
      } : {
        name: "Unknown User",
        profilePic: undefined,
        firstName: "Unknown",
        lastName: "User"
      }
    };

    res.send(responseData);
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

// @ts-ignore
tipsRouter.post("/:tipId/comment", async (req, res) => {
  const startTime = Date.now();
  const { tipId } = req.params;
  const { userId, content } = req.body;

  console.log(`[${new Date().toISOString()}] Received comment request:`, {
    tipId,
    userId,
    contentLength: content?.length,
  });

  try {
    if (!userId || !content || !tipId) {
      console.warn(`[${new Date().toISOString()}] Missing required fields:`, {
        hasUserId: !!userId,
        hasContent: !!content,
        hasTipId: !!tipId,
      });
      return res.status(400).json({ error: "Missing required fields" });
    }

    await commentPost(userId, tipId, content);

    const duration = Date.now() - startTime;
    console.log(`[${new Date().toISOString()}] Comment request completed:`, {
      tipId,
      userId,
      duration: `${duration}ms`,
    });

    res.status(200).json({ message: "Comment added successfully" });
  } catch (error) {
    const duration = Date.now() - startTime;
    console.error(`[${new Date().toISOString()}] Comment request failed:`, {
      error: error instanceof Error ? error.message : "Unknown error",
      tipId,
      userId,
      duration: `${duration}ms`,
    });

    res.status(500).json({
      error: error instanceof Error ? error.message : "Failed to add comment",
    });
  }
});

export default tipsRouter;
