import { addDoc, collection } from "@firebase/firestore";
import DB from "../db/db";

export interface CreateTipReturn {
  tipId: string;
}

export async function createTip(
  title: string,
  type: string,
  authorId: string,
  description: string,
  content: string
): Promise<CreateTipReturn> {
  const ret = await addDoc(collection(DB, "tips"), {
    title: title,
    type: type,
    authorId: authorId,
    tags: [],
    ratings: [],
    description: description,
    upvotes: [],
    downvotes: [],
    createdAt: Math.floor(Date.now() / 1000),
    content: content,
    comments: [],
  });

  return {
    tipId: ret.id,
  };
}