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

  test("testing creating a new user", async () => {
    const res = await axios.post(`${SERVER}/users/register`, {
      email: "ewell.ortiz@ethereal.email",
      password: "FZKJA3Sfk3KAz7MDRg",
      firstName: "Ewell",
      lastName: "Ortiz",
    });

    expect(res.data).toStrictEqual({
      userId: expect.any(String),
    });

    const delRes = await axios.delete(`${SERVER}/users/${res.data.userId}`);
    expect(delRes.data).toStrictEqual({});
  });

  test("Test creating, fetching and deleting single new tip", async () => {
    const createRes = await axios.post(`${SERVER}/tips/`, {
      title: "example title",
      type: "LIFE",
      authorId: "123",
      description: "this is an example description",
      content: "this is example content"
    });

    expect(createRes.data).toStrictEqual({
      tipId: expect.any(String),
    });

    const viewRes = await axios.get(`${SERVER}/tips/${createRes.data.tipId}`);

    // currently not testing time-based properties because not bothered.
    expect(viewRes.data).toStrictEqual({
      authorId: "123",
      ratings: [],
      downvotes: [],
      content: "this is example content",
      upvotes: [],
      description: "this is an example description",
      tags: [],
      createdAt: expect.any(Number),
      title: "example title",
      comments: [],
      type: "LIFE"
    });

    const delRes = await axios.delete(`${SERVER}/tips/${createRes.data.tipId}`);
    expect(delRes.data).toStrictEqual({});
  });

  afterAll(async () => {
    const apps = getApps();
    if (apps.length) await Promise.all(apps.map(deleteApp));
  });
});
