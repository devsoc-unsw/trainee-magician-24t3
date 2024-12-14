import { doc, getDoc, updateDoc } from "@firebase/firestore";
import DB from "../db/db";

export interface UpdateUserInfoReturn {
  userId: string;
}

export async function updateUserInfo(
  userId: string,
  email: string,
  firstName: string,
  lastName: string
): Promise<UpdateUserInfoReturn | null> {
  try {
    console.log("Attempting to update user info for userId:", userId);
    const userRef = doc(DB, "users", userId);

    // Ensure the user exists
    const userDoc = await getDoc(userRef);
    if (!userDoc.exists()) {
      console.error("No user found with the provided userId.");
      return null;
    }
    // Update user info
    await updateDoc(userRef, {
      firstName,
      lastName,
      email,
    });

    console.log("Updated data of user with ID:", userId);
    return { userId };
  } catch (error) {
    console.error("Error updating user info:", error);
    throw new Error("Failed to update user info.");
  }
}
