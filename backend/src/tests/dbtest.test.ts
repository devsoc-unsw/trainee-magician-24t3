import { collection, getDocs } from "@firebase/firestore";
import db from "../db/db";
import { deleteApp, getApps } from "@firebase/app";

describe("Initial test", () => {
  test("Database initialisation test", async () => {
    const res = (await getDocs(collection(db, "test"))).docs.map((d) =>
      d.data()
    );

    expect(res[0]).toStrictEqual({ name: "Jayden" });
  });

  afterAll(async () => {
    const apps = getApps();
    if (apps.length) await Promise.all(apps.map(deleteApp));
  });
});
