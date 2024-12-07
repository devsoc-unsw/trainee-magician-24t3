import { collection, query, where, getDoc, limit, doc } from "@firebase/firestore";
import DB from "../db/db";

export interface UserInfoReturn {
    firstName: string,
    lastName: string,
    profileUrl: string,
    favouritePosts: string[],
    password: string,
    email: string
}

export async function userInfo(
  userId: string
): Promise<UserInfoReturn> {
  const docRef = doc(DB, 'users', userId);
  const docSnapshot = await getDoc(docRef);
  const userInfo = docSnapshot.data();

 // error checking?

  return {
    firstName: userInfo.firstName,
    lastName: userInfo.lastName,
    profileUrl: userInfo.profileUrl,
    favouritePosts: userInfo.favouritePosts,
    password: userInfo.password,
    email: userInfo.email
  }
}