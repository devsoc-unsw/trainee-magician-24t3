import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentReference,
  getDoc,
} from "@firebase/firestore";
import { query, Router } from "express";
import DB from "../db/db";
import { register } from "../user/register";
import { fetchUserInfo } from "../user/fetchUserInfo";

const userRouter = Router();

userRouter.get("/:id", async (req, res) => {
  try {
    const ret = await fetchUserInfo(req.params.id);
    res.send(ret);
  } catch (e) {
    return res.status(400).json({ error: e.message});
  }
});


userRouter.post("/register", async (req, res) => {
  const ret = await register(
    req.body.email,
    req.body.password,
    req.body.firstName,
    req.body.lastName
  );

  res.send(ret);
});

userRouter.delete("/:id", async (req, res) => {
  const ret = await deleteDoc(doc(DB, "users", req.params.id));
  res.send({});
});

export default userRouter;
