import { initializeApp } from "firebase-admin";
import { applicationDefault } from "firebase-admin/app";

// need GOOGLE_APPLICATION_CREDENTIALS env var.
export const initFirebaseApp = () => {
  initializeApp({
    credential: applicationDefault(),
  });
};
