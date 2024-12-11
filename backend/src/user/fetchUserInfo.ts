import { getDoc, doc } from "@firebase/firestore";
import DB from "../db/db";

export interface FetchUserInfoReturn {
    firstName: string,
    lastName: string,
    profileUrl: string,
    favouritePosts: string[],
    password: string,
    email: string
}

export async function fetchUserInfo(
  userId: string
): Promise<FetchUserInfoReturn> {
  const docRef = doc(DB, 'users', userId);
  const docSnapshot = await getDoc(docRef);
  const userInfo = docSnapshot.data();

  if (!docSnapshot.exists()) {
    throw new Error('UserId does not exist');
  }

  return {
    firstName: userInfo.firstName,
    lastName: userInfo.lastName,
    profileUrl: userInfo.profileUrl,
    favouritePosts: userInfo.favouritePosts,
    password: userInfo.password,
    email: userInfo.email
  }
}