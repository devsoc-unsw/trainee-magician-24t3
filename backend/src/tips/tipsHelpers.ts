import { doc, DocumentData, getDoc, updateDoc } from "@firebase/firestore";
import DB from "../db/db";

export async function doesUserExist(userId: string): Promise<boolean> {
  const docRef = doc(DB, "users", userId);
  const docSnapshot = await getDoc(docRef);
  return docSnapshot.exists();
}