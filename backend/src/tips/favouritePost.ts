import { doc, DocumentData, getDoc, updateDoc } from "@firebase/firestore";
import DB from "../db/db";

export async function favouritePost(
  userId: string,
  tipId: string,
  turnon: boolean
): Promise<{}> {
  const docRef = doc(DB, "users", userId);
  let docSnapshot = await getDoc(docRef);
  let docData = docSnapshot.data() as DocumentData;

  const updatedArray = docData.favouritePosts.filter((id: string) => id !== tipId);
  if (turnon) {
    updatedArray.push(tipId); 
  }

  await updateDoc(docRef, { favouritePosts: updatedArray });

  return {};
}