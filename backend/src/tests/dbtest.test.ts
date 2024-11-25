import { collection, getDocs } from "@firebase/firestore";
import db from "../db/db";
import { deleteApp, getApps } from "@firebase/app";
import "dotenv/config";
import axios from "axios";

describe("Initial test", () => {
  test("Database initialisation test", async () => {
    const res = (await getDocs(collection(db, "test"))).docs.map((d) =>
      d.data()
    );

    expect(res[0]).toStrictEqual({ name: "Jayden" });
  });

  test("Test backend is working", async () => {
    const res = await axios.get(
      `${process.env.SERVER_ADDR}:${process.env.LDPT_PORT}/`
    );

    expect(res.data).toStrictEqual("hello world");
  });

  afterAll(async () => {
    const apps = getApps();
    if (apps.length) await Promise.all(apps.map(deleteApp));
  });
});
