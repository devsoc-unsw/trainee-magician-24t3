import { doc, DocumentData, getDoc, updateDoc } from "@firebase/firestore";
import DB from "../db/db";
import { doesUserExist } from "./tipsHelpers";

interface RatingObject {
  value: number;
  raterId: string;
}

export interface SubmitRatingReturn {
  ratings: RatingObject[];
}

export async function submitRating(
  userId: string,
  tipId: string,
  value: number
): Promise<SubmitRatingReturn> {
  if (userId === "" || tipId === "") {
    throw new Error("Cannot have empty fields");
  }

  const docRef = doc(DB, "tips", tipId);
  let docSnapshot = await getDoc(docRef);
  if (!docSnapshot.exists()) {
    throw new Error("Tip does not exist");
  } else if (!doesUserExist(userId)) {
    throw new Error("User does not exist");
  }
  let docData = docSnapshot.data() as DocumentData;

  // remove previous rating if user has already submitted before
  const updatedArray = docData.ratings.filter(
    (ratingObj: RatingObject) => ratingObj.raterId !== userId
  );
  updatedArray.push({
    value: value,
    raterId: userId,
  });

  await updateDoc(docRef, { ratings: updatedArray });

  docSnapshot = await getDoc(docRef);
  docData = docSnapshot.data() as DocumentData;

  return { ratings: docData.ratings };
}
