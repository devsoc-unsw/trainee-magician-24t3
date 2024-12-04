import { collection, getDocs } from "@firebase/firestore";
import DB from "../db/db";
import { deleteApp, getApps } from "@firebase/app";
import "dotenv/config";
import axios from "axios";

const SERVER = `${process.env.SERVER_ADDR}:${process.env.LDPT_PORT}`;

describe("Initial test", () => {
  test("Database initialisation test", async () => {
    const res = (await getDocs(collection(DB, "test"))).docs.map((d) =>
      d.data()
    );

    expect(res[0]).toStrictEqual({ name: "Jayden" });
  });

  test("Test backend is working", async () => {
    const res = await axios.get(`${SERVER}/`);

    expect(res.data).toStrictEqual("hello world");
  });

  test("Test retrieving all tips", async () => {
    const res = await axios.get(`${SERVER}/tips/`);
    console.log(res.data.tips[0]);
    expect(res.data.length > 0);
  });

  afterAll(async () => {
    const apps = getApps();
    if (apps.length) await Promise.all(apps.map(deleteApp));
  });
});
