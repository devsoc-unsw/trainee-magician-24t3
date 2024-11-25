import { Router } from "express";
import db from "../db/db";
import { collection, getDocs } from "@firebase/firestore";

const testRouter = Router();

testRouter.get("/", async (req, res) => {
  const testCollection = collection(db, "test");
  const testDocsData = (await getDocs(testCollection)).docs.map((d) =>
    d.data()
  );
  res.send(testDocsData[0]);
});

export default testRouter;
