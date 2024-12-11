import { collection, query, where, getDocs, limit } from "@firebase/firestore";
import DB from "../db/db";

export interface LoginReturn {
  userId: string;
}

export async function login(
  email: string,
  password: string,
): Promise<LoginReturn> {
  const usersRef = collection(DB, 'users');

  const q = query(usersRef, where('email', '==', email), where('password', '==', password), limit(1));
  const querySnapshot = await getDocs(q);
  
  if (querySnapshot.empty) { 
    throw new Error('Invalid email or password');
  }

  return {
    userId: querySnapshot.docs[0].id
  }
}
