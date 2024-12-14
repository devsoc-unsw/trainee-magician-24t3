import { doc, DocumentData, getDoc, updateDoc } from "@firebase/firestore";
import DB from "../db/db";
import { doesUserExist } from "./tipsHelpers";

export async function commentPost(
  userId: string,
  tipId: string,
  content: string
): Promise<{}> {
  // Input validation
  if (!userId || !tipId || !content) {
    throw new Error('Cannot have empty fields');
  }

  try {
    // Check if user exists
    const userExists = await doesUserExist(userId);
    if (!userExists) {
      throw new Error('User does not exist');
    }

    // Get tip document
    const docRef = doc(DB, "tips", tipId);
    const docSnapshot = await getDoc(docRef);
    
    if (!docSnapshot.exists()) {
      throw new Error("Tip does not exist");
    }
    
    const docData = docSnapshot.data() as DocumentData;
    
    // Initialize comments array if it doesn't exist
    const comments = docData.comments || [];
    
    // Add new comment
    const newComment = {
      authorId: userId,
      content: content,
      createdAt: new Date().toISOString()
    };
    
    comments.push(newComment);

    // Update document with new comments array
    await updateDoc(docRef, { comments: comments });

    return {};
  } catch (error) {
    console.error("Error in commentPost:", error);
    throw error;
  }
}
