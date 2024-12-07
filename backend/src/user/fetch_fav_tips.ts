import { getDoc, doc } from "@firebase/firestore";
import DB from "../db/db";

export interface FetchFavTipsReturn {
  tips: Tip[]
}

export interface Tip {
  title: string,
  type: string,
  authorId: string,
  tags: string[],
  ratings: Rating[],
  description: string,
  upvotes: string[],
  downvotes: string[],
  createdAt: string,
  content: string,
  comments: Comment[]
}

export interface Rating {
  value: number,
  raterId: string
}

export interface Comment {
  authorId: string,
  content: string,
  createdAt: string
}

export async function fetchFavTips(
  userId: string
): Promise<FetchFavTipsReturn> {
  const docRef = doc(DB, 'users', userId);
  const docSnapshot = await getDoc(docRef);

  // error checking for docSnapshot..?
  const favouriteTipIds = docSnapshot.data().favouritePosts;

  const favTips = [];
  for (const tipId of favouriteTipIds) {
    const tipDocRef = doc(DB, 'tips', tipId);
    // error checking???
    const tipDocSnapshot = await getDoc(tipDocRef);
    const tipData = tipDocSnapshot.data();
    favTips.push(tipData);
  }

  return {
    tips: favTips
  }
}