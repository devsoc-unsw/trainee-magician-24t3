import { addDoc, collection } from "@firebase/firestore";
import DB from "../db/db";

export interface RegisterReturn {
  userId: string;
}

interface UserData {
  email: string;
  favouritePosts: string[];
  firstName: string;
  lastName: string;
  password: string;
  profileUrl: string;
}

export async function register(
  email: string,
  password: string,
  firstName: string,
  lastName: string
): Promise<RegisterReturn> {
  const userData: UserData = {
    email,
    favouritePosts: [],
    firstName,
    lastName,
    password,
    profileUrl: "",
  };

  const ret = await addDoc(collection(DB, "users"), userData)
;
  return {
    userId: ret.id,
  };
}
