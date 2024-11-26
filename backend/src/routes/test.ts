import { Router } from "express";
import DB from "../db/db";
import { collection, getDocs } from "@firebase/firestore";

const testRouter = Router();

testRouter.get("/", async (req, res) => {
  const testCollection = collection(DB, "test");
  const testDocsData = (await getDocs(testCollection)).docs.map((d) =>
    d.data()
  );
  res.send(testDocsData[0]);
});

export default testRouter;
