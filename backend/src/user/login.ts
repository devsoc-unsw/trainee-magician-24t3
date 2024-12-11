import { collection, query, where, getDocs, limit } from "@firebase/firestore";
import DB from "../db/db";

export interface LoginReturn {
  userId: string;
}

export async function login(
  email: string,
  password: string,
): Promise<LoginReturn> {
  console.log("Attempting login for email:", email);
  const usersRef = collection(DB, 'users');

  const q = query(
    usersRef, 
    where('email', '==', email), 
    where('password', '==', password), 
    limit(1)
  );
  
  const querySnapshot = await getDocs(q);
  
  if (querySnapshot.empty) { 
    console.log("No user found with those credentials");
    throw new Error('Invalid email or password');
  }

  const userId = querySnapshot.docs[0].id;
  console.log("Found user with ID:", userId);

  return {
    userId
  };
}
