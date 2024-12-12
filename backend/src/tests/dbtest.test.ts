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
    // First create a tip to ensure we have data
    const createRes = await axios.post(`${SERVER}/tips/`, {
      title: "Test Tip Title",
      type: "LIFE",
      authorId: "test123",
      description: "Test description",
      content: "Test content"
    });

    expect(createRes.data).toStrictEqual({
      tipId: expect.any(String),
    });

    // Now fetch all tips
    const getAllRes = await axios.get(`${SERVER}/tips/`);
    
    // Check the response structure
    expect(getAllRes.data).toHaveProperty('tips');
    expect(Array.isArray(getAllRes.data.tips)).toBe(true);
    expect(getAllRes.data.tips.length).toBeGreaterThan(0);

    // Check the structure of a tip in the response
    const firstTip = getAllRes.data.tips[0];
    expect(firstTip).toMatchObject({
      title: expect.any(String),
      type: expect.any(String),
      authorId: expect.any(String),
      description: expect.any(String),
      content: expect.any(String),
      ratings: expect.any(Array),
      upvotes: expect.any(Array),
      downvotes: expect.any(Array),
      comments: expect.any(Array),
      createdAt: expect.any(Number),
      tags: expect.any(Array)
    });

    // Clean up - delete the created tip
    const delRes = await axios.delete(`${SERVER}/tips/${createRes.data.tipId}`);
    expect(delRes.data).toStrictEqual({});
  });

  test("testing creating a new user", async () => {
    const res = await axios.post(`${SERVER}/users/register`, {
      email: "test@example.com",
      password: "test123",
      firstName: "Test",
      lastName: "User",
    });

    expect(res.data).toStrictEqual({
      userId: expect.any(String),
    });

    const delRes = await axios.delete(`${SERVER}/users/${res.data.userId}`);
    expect(delRes.data).toStrictEqual({});
  });

  test("Test user login", async () => {
    // Create user
    await axios.post(`${SERVER}/users/register`, {
      email: "ewell.ortiz@ethereal.email",
      password: "FZKJA3Sfk3KAz7MDRg",
      firstName: "Ewell",
      lastName: "Ortiz",
    });

    const res = await axios.post(`${SERVER}/users/login`, {
      email: "ewell.ortiz@ethereal.email",
      password: "FZKJA3Sfk3KAz7MDRg",
    });

    expect(res.data).toStrictEqual({
      userId: expect.any(String),
    });

    // testing wrong password
    try {
      await axios.post(`${SERVER}/users/login`, {
        email: "ewell.ortiz@ethereal.email",
        password: "wrongPassword",
      });
    } catch (e: any) {
      expect(e.response.status).toStrictEqual(400);
    }

    const delRes = await axios.delete(`${SERVER}/users/${res.data.userId}`);
    expect(delRes.data).toStrictEqual({});
  });

  test("Test creating, fetching and deleting single new tip", async () => {
    const createRes = await axios.post(`${SERVER}/tips/`, {
      title: "example title",
      type: "LIFE",
      authorId: "123",
      description: "this is an example description",
      content: "this is example content",
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
      type: "LIFE",
    });

    const delRes = await axios.delete(`${SERVER}/tips/${createRes.data.tipId}`);
    expect(delRes.data).toStrictEqual({});
  });

  describe("Test tip post functions", () => {
    let createTipRes: any;
    let createUserRes: any;
    beforeAll(async () => {
      createUserRes = await axios.post(`${SERVER}/users/register`, {
        email: "myspecialemail@gmail.com",
        password: "asrotih12b3@!aa",
        firstName: "Sigma",
        lastName: "Boy",
      });

      expect(createUserRes.data).toStrictEqual({
        userId: expect.any(String),
      });

      createTipRes = await axios.post(`${SERVER}/tips/`, {
        title: "example title",
        type: "LIFE",
        authorId: createUserRes.data.userId,
        description: "this is an example description",
        content: "this is example content",
      });

      expect(createTipRes.data).toStrictEqual({
        tipId: expect.any(String),
      });
    });

    test("upvote and downvote post", async () => {
      let res = await axios.put(
        `${SERVER}/tips/${createUserRes.data.userId}/upvote`,
        {
          tipId: createTipRes.data.tipId,
          turnon: true,
        }
      );
      expect(res.data).toStrictEqual({ upvotes: 1, downvotes: 0 });

      let viewRes = await axios.get(
        `${SERVER}/tips/${createTipRes.data.tipId}`
      );
      expect(viewRes.data.upvotes).toStrictEqual([createUserRes.data.userId]);
      expect(viewRes.data.downvotes).toStrictEqual([]);

      // test if downvoting also removes upvote
      res = await axios.put(
        `${SERVER}/tips/${createUserRes.data.userId}/downvote`,
        {
          tipId: createTipRes.data.tipId,
          turnon: true,
        }
      );
      expect(res.data).toStrictEqual({ upvotes: 0, downvotes: 1 });

      viewRes = await axios.get(`${SERVER}/tips/${createTipRes.data.tipId}`);
      expect(viewRes.data.upvotes).toStrictEqual([]);
      expect(viewRes.data.downvotes).toStrictEqual([createUserRes.data.userId]);

      res = await axios.put(
        `${SERVER}/tips/${createUserRes.data.userId}/downvote`,
        {
          tipId: createTipRes.data.tipId,
          turnon: false,
        }
      );
      expect(res.data).toStrictEqual({ upvotes: 0, downvotes: 0 });

      viewRes = await axios.get(`${SERVER}/tips/${createTipRes.data.tipId}`);
      expect(viewRes.data.upvotes).toStrictEqual([]);
      expect(viewRes.data.downvotes).toStrictEqual([]);
    });

    test("upvote and downvote returns errors", async () => {
      try {
        await axios.put(
          `${SERVER}/tips/${createUserRes.data.userId}/upvote`,
          {
            tipId: 'thereisnowaythistipidexists',
            turnon: true,
          }
        );
      } catch (e: any) {
        expect(e.response.status).toStrictEqual(400);
        expect(e.response.data).toStrictEqual({ error: expect.any(String) });
      }

      try {
        await axios.put(
          `${SERVER}/tips/thereisnowaythisuseridexists/downvote`,
          {
            tipId: createTipRes.data.tipId,
            turnon: false,
          }
        );
      } catch (e: any) {
        expect(e.response.status).toStrictEqual(400);
        expect(e.response.data).toStrictEqual({ error: expect.any(String) });
      }
    });

    // TODO: need to wait until viewing user route is implemented to test
    test.todo("favourite post");

    test("favourite returns errors", async () => {
      try {
        await axios.put(
          `${SERVER}/tips/${createUserRes.data.userId}/favourite`,
          {
            tipId: 'thereisnowaythistipidexists',
            turnon: true,
          }
        );
      }  catch (e: any) {
        expect(e.response.status).toStrictEqual(400);
        expect(e.response.data).toStrictEqual({ error: expect.any(String) });
      }

      try {
        await axios.put(
          `${SERVER}/tips/thereisnowaythisuseridexists/favourite`,
          {
            tipId: createTipRes.data.tipId,
            turnon: true,
          }
        );
      } catch (e: any) {
        expect(e.response.status).toStrictEqual(400);
        expect(e.response.data).toStrictEqual({ error: expect.any(String) });
      }
    });

    test("comment on post", async () => {
      const res = await axios.post(
        `${SERVER}/tips/${createUserRes.data.userId}/comment`,
        {
          tipId: createTipRes.data.tipId,
          content: "hello there this is a comment!",
        }
      );
      expect(res.data).toStrictEqual({});
      const viewRes = await axios.get(
        `${SERVER}/tips/${createTipRes.data.tipId}`
      );
      expect(viewRes.data.comments).toStrictEqual([
        {
          authorId: createUserRes.data.userId,
          content: "hello there this is a comment!",
          createdAt: expect.any(Number),
        },
      ]);
    });

    test("comment returns errors", async () => {
      try {
        await axios.post(
          `${SERVER}/tips/${createUserRes.data.userId}/comment`,
          {
            tipId: 'thereisnowaythistipexists',
            content: "hello there this is a comment!",
          }
        );
      } catch (e: any) {
        expect(e.response.status).toStrictEqual(400);
        expect(e.response.data).toStrictEqual({ error: expect.any(String) });
      }
    });

    afterAll(async () => {
      const delTipRes = await axios.delete(
        `${SERVER}/tips/${createTipRes.data.tipId}`
      );
      expect(delTipRes.data).toStrictEqual({});

      const delUserRes = await axios.delete(
        `${SERVER}/users/${createUserRes.data.userId}`
      );
      expect(delUserRes.data).toStrictEqual({});
    });
  });

  test("Verify tips in database", async () => {
    const res = await axios.get(`${SERVER}/tips/`);
    console.log('All tips in database:', res.data);
    expect(Array.isArray(res.data.tips)).toBe(true);
  });

  afterAll(async () => {
    const apps = getApps();
    if (apps.length) await Promise.all(apps.map(deleteApp));
  });
});
