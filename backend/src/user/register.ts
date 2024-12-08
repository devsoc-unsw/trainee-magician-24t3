import { addDoc, collection } from "@firebase/firestore";
import DB from "../db/db";

export interface RegisterReturn {
  userId: string;
}

export async function register(
  email: string,
  password: string,
  firstName: string,
  lastName: string
): Promise<RegisterReturn> {
  const ret = await addDoc(collection(DB, "users"), {
    email: email,
    favouritePosts: [],
    firstName: firstName,
    lastName: lastName,
    password: password,
    profileUrl: "",
  });

  return {
    userId: ret.id,
  };
}
