import { doc, DocumentData, getDoc, updateDoc } from "@firebase/firestore";
import DB from "../db/db";
import { doesUserExist } from "./tipsHelpers";

export async function favouritePost(
  userId: string,
  tipId: string,
  turnon: boolean
): Promise<{}> {
  if (userId === '' || tipId === '') {
    throw new Error('Cannot have empty fields');
  } else if (!doesUserExist(userId)) {
    throw new Error('User does not exist');
  }

  const docRef = doc(DB, "users", userId);
  let docSnapshot = await getDoc(docRef);
  if (!docSnapshot.exists()) {
    throw new Error("Tip does not exist");
  }
  let docData = docSnapshot.data() as DocumentData;
  const updatedArray = docData.favouritePosts.filter(
    (id: string) => id !== tipId
  );
  if (turnon) {
    updatedArray.push(tipId);
  }

  await updateDoc(docRef, { favouritePosts: updatedArray });

  return {};
}
