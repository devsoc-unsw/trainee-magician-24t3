import { doc, DocumentData, getDoc, updateDoc } from "@firebase/firestore";
import DB from "../db/db";

export async function commentPost(
  userId: string,
  tipId: string,
  content: string
): Promise<{}> {
  const docRef = doc(DB, "tips", tipId);
  let docSnapshot = await getDoc(docRef);
  let docData = docSnapshot.data() as DocumentData;

  const updatedArray = docData.comments;
  updatedArray.push({
    authorId: userId,
    content: content,
    createdAt: Math.floor(Date.now() / 1000)
  });

  await updateDoc(docRef, { comments: updatedArray });

  return {};
}