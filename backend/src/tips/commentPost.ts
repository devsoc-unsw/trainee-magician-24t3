import { doc, DocumentData, getDoc, updateDoc } from "@firebase/firestore";
import DB from "../db/db";
import { doesUserExist } from "./tipsHelpers";

export async function commentPost(
  userId: string,
  tipId: string,
  content: string
): Promise<{}> {
  if (userId === '' || tipId === '' || content == '') {
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

  const updatedArray = docData.comments;
  updatedArray.push({
    authorId: userId,
    content: content,
    createdAt: Math.floor(Date.now() / 1000),
  });

  await updateDoc(docRef, { comments: updatedArray });

  return {};
}
