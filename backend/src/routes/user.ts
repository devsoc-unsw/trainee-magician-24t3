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

const userRouter = Router();

// not correct code
userRouter.get("/:id", (req, res) => {
  console.log(req.params.id);
  res.send({
    id: req.params.id,
  });
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
