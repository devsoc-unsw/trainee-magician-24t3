import { doc, DocumentData, getDoc, updateDoc } from "@firebase/firestore";
import DB from "../db/db";
import { upvotePost } from "./upvotePost";
import { doesUserExist } from "./tipsHelpers";

export interface DownvotePostReturn {
  upvotes: number;
  downvotes: number;
}

export async function downvotePost(
  userId: string,
  tipId: string,
  turnon: boolean
): Promise<DownvotePostReturn> {
  if (userId === '' || tipId === '') {
    throw new Error('Cannot have empty fields');
  } else if (!doesUserExist(userId)) {
    throw new Error('User does not exist');
  }

  const docRef = doc(DB, "tips", tipId);
  let docSnapshot = await getDoc(docRef);
  if (!docSnapshot.exists()) {
    throw new Error("Tip does not exist");
  }
  let docData = docSnapshot.data() as DocumentData;

  const updatedArray = docData.downvotes.filter((id: string) => id !== userId);
  if (turnon) {
    updatedArray.push(userId);
    // attempt to remove upvote if user downvotes post
    await upvotePost(userId, tipId, false);
  }

  await updateDoc(docRef, { downvotes: updatedArray });

  docSnapshot = await getDoc(docRef);
  docData = docSnapshot.data() as DocumentData;

  return {
    upvotes: docData.upvotes.length,
    downvotes: docData.downvotes.length,
  };
}
