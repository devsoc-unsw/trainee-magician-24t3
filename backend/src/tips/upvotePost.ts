import { doc, DocumentData, getDoc, updateDoc } from "@firebase/firestore";
import DB from "../db/db";
import { downvotePost } from "./downvotePost";

export interface UpvotePostReturn {
  upvotes: number;
  downvotes: number;
}

export async function upvotePost(
  userId: string,
  tipId: string,
  turnon: boolean
): Promise<UpvotePostReturn> {
  const docRef = doc(DB, "tips", tipId);
  let docSnapshot = await getDoc(docRef);
  let docData = docSnapshot.data() as DocumentData;

  const updatedArray = docData.upvotes.filter((id: string) => id !== userId);
  if (turnon) {
    updatedArray.push(userId);
    // attempt to remove downvote if user upvotes post
    downvotePost(userId, tipId, false);
  }

  await updateDoc(docRef, { upvotes: updatedArray });

  docSnapshot = await getDoc(docRef);
  docData = docSnapshot.data() as DocumentData;

  return {
    upvotes: docData.upvotes.length,
    downvotes: docData.downvotes.length,
  };
}
