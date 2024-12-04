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

const userRouter = Router();

userRouter.get("/:id", (req, res) => {
  console.log(req.params.id);
  res.send({
    id: req.params.id,
  });
});

userRouter.post("/register", async (req, res) => {
  const ret = await addDoc(collection(DB, "users"), {
    email: req.body.email,
    favouritePosts: [],
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password,
    profileUrl: "",
  });

  res.send({
    userId: ret.id,
  });
});

userRouter.delete("/:id", async (req, res) => {
  const ret = await deleteDoc(doc(DB, "users", req.params.id));
  res.send({});
});

export default userRouter;
