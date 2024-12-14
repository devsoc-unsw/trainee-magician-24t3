import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentReference,
  updateDoc,
  getDoc,
} from "@firebase/firestore";
import { Router, Request, Response, RequestHandler } from "express";
import DB from "../db/db";
import { register } from "../user/register";
import { login } from "../user/login";
import { updateUserInfo } from "../user/update";

const userRouter = Router();

userRouter.get("/:id", (async (req: Request, res: Response) => {
  try {
    const userDoc = await getDoc(doc(DB, "users", req.params.id));
    if (!userDoc.exists()) {
      return res.status(404).json({ error: 'User not found' });
    }
    const userData = userDoc.data();
    res.json({
      id: userDoc.id,
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      profileUrl: userData.profileUrl,
      favouritePosts: userData.favouritePosts
    });
  } catch (error) {
    console.error('Error fetching user:', error);
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
    console.log("Login attempt with:", req.body);
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const ret = await login(email, password);
    console.log("Login successful, returning:", ret);
    res.json(ret);
  } catch (error: unknown) {
    console.error("Login error:", error);
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

userRouter.put("/:id", (async (req: Request, res: Response) => {
  try {
    console.log("Update request received for user:", req.params.id, req.body);

    const userId = req.params.id;
    const { firstName, lastName, email } = req.body;
    const updatedData = req.body;

    console.log("Updating user info:", updatedData);
    if (!firstName || !lastName || !email) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const result = await updateUserInfo(userId, email, firstName, lastName);

    if (!result) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      message: "User updated successfully",
      userId: result.userId,
    });
  } catch (e: any) {
    console.error("Error updating user:", e.message);
    res.status(500).json({ error: e.message });
  }
}) as RequestHandler);

export default userRouter;
