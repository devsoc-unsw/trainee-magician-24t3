import { doc, getDoc, updateDoc } from "@firebase/firestore";
import DB from "../db/db";

export interface UpdateUserInfoReturn {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  profileUrl?: string;
  favouritePosts: string[];
}

export async function updateUserInfo(
  userId: string,
  email: string,
  firstName: string,
  lastName: string
): Promise<UpdateUserInfoReturn | null> {
  try {
    const userRef = doc(DB, "users", userId);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      console.error("No user found with the provided userId.");
      return null;
    }

    const userData = userDoc.data();

    // Update user info
    await updateDoc(userRef, {
      firstName,
      lastName,
      email,
    });

    // Return updated user data
    return {
      id: userId,
      firstName,
      lastName,
      email,
      profileUrl: userData.profileUrl,
      favouritePosts: userData.favouritePosts
    };
  } catch (error) {
    console.error("Error updating user info:", error);
    throw new Error("Failed to update user info.");
  }
}
