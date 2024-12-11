import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentReference,
  getDoc,
} from "@firebase/firestore";
import { Router, Request, Response, RequestHandler } from "express";
import DB from "../db/db";
import { register } from "../user/register";
import { login } from "../user/login";

const userRouter = Router();

// not correct code
userRouter.get("/:id", (async (req: Request, res: Response) => {
  try {
    const userDoc = await getDoc(doc(DB, "users", req.params.id));
    if (!userDoc.exists()) {
      return res.status(404).json({ error: 'User not found' });
    }
    const userData = userDoc.data();
    res.json({
      ...userData,
      id: userDoc.id
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
}) as RequestHandler);

userRouter.post("/register", (async (req: Request, res: Response) => {
  console.log("Received registration request:", req.body);
  try {
    const ret = await register(
      req.body.email,
      req.body.password,
      req.body.firstName,
      req.body.lastName
    );
    console.log("Registration successful:", ret);
    res.send(ret);
  } catch (error: unknown) {
    console.error("Registration failed:", error);
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: 'An unknown error occurred' });
    }
  }
}) as RequestHandler);

userRouter.post("/login", (async (req: Request, res: Response) => {
  try {
    const ret = await login(
      req.body.email,
      req.body.password,
    );
    res.send(ret);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    }
    return res.status(400).json({ error: 'An unknown error occurred' });
  }
}) as RequestHandler);

userRouter.delete("/:id", (async (req: Request, res: Response) => {
  const ret = await deleteDoc(doc(DB, "users", req.params.id));
  res.send({});
}) as RequestHandler);

export default userRouter;
