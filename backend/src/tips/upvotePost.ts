import { doc, DocumentData, getDoc, updateDoc } from "@firebase/firestore";
import DB from "../db/db";
import { downvotePost } from "./downvotePost";
import { doesUserExist } from "./tipsHelpers";

export interface UpvotePostReturn {
  upvotes: number;
  downvotes: number;
}

export async function upvotePost(
  userId: string,
  tipId: string,
  turnon: boolean
): Promise<UpvotePostReturn> {
  if (userId === '' || tipId === '') {
    throw new Error('Cannot have empty fields');
  }

  const docRef = doc(DB, "tips", tipId);
  let docSnapshot = await getDoc(docRef);
  if (!docSnapshot.exists()) {
    throw new Error("Tip does not exist");
  } else if (!doesUserExist(userId)) {
    throw new Error('User does not exist');
  }
  let docData = docSnapshot.data() as DocumentData;

  const updatedArray = docData.upvotes.filter((id: string) => id !== userId);
  if (turnon) {
    updatedArray.push(userId);
    // attempt to remove downvote if user upvotes post
    await downvotePost(userId, tipId, false);
  }

  await updateDoc(docRef, { upvotes: updatedArray });

  docSnapshot = await getDoc(docRef);
  docData = docSnapshot.data() as DocumentData;

  return {
    upvotes: docData.upvotes.length,
    downvotes: docData.downvotes.length,
  };
}
