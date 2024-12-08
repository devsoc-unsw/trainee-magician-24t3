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

  test("testing fetching a user's favourite tips from a userId", async () => {
    // Create user
    const resRegister = await axios.post(`${SERVER}/users/register`, {
      email: "ewell.ortiz@ethereal.email",
      password: "FZKJA3Sfk3KAz7MDRg",
      firstName: "Ewell",
      lastName: "Ortiz",
    });
    const res = await axios.get(`${SERVER}/users/${resRegister.data.userId}/favourites`);
    expect(res.data).toStrictEqual({
      tips: []
    });

    //add tests when favourite tip and create tip functions are implemented

    const delRes = await axios.delete(`${SERVER}/users/${resRegister.data.userId}`);
    expect(delRes.data).toStrictEqual({});
  });

  afterAll(async () => {
    const apps = getApps();
    if (apps.length) await Promise.all(apps.map(deleteApp));
  });
});
