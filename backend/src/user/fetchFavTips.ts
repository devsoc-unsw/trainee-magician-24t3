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

  // error checking for docSnapshot to see if it exits?..?
  const favouriteTipIds = docSnapshot.data().favouritePosts;

  const favTips:Tip[] = [];
  for (const tipId of favouriteTipIds) {
    const tipDocRef = doc(DB, 'tips', tipId);
    const tipDocSnapshot = await getDoc(tipDocRef);
    if (tipDocSnapshot.exists()) {
      const tipData = tipDocSnapshot.data();
      const tip = {
        title: tipData.title,
        type: tipData.type,
        authorId: tipData.authorId,
        tags: tipData.tags,
        ratings: tipData.ratings,
        description: tipData.description,
        upvotes: tipData.upvotes,
        downvotes: tipData.downvotes,
        createdAt: tipData.createdAt,
        content: tipData.content,
        comments: tipData.comments
      }
      favTips.push(tip);
    }
  }

  return {
    tips: favTips
  }
}