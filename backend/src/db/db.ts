import { initializeApp } from "@firebase/app";
import { getFirestore } from "@firebase/firestore";
import "dotenv/config";

const config = {
  apiKey: process.env.FB_API_KEY,
  authDomain: process.env.FB_AUTH_DOMAIN,
  projectId: process.env.FB_PROJECT_ID,
  storageBucket: process.env.FB_STORAGE_BUCKET,
  messagingSenderId: process.env.FB_MSG_SENDER_ID,
  appId: process.env.FB_APP_ID,
  measurementId: process.env.FB_MEASUREMENT_ID,
};

console.log("Firebase Config:", config);

const app = initializeApp(config);
const DB = getFirestore(app);

// Also check if we can access Firestore
try {
  console.log("Firestore initialized:", DB.type);
} catch (error) {
  console.error("Firestore initialization error:", error);
}

export default DB;
