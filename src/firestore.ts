import { firestore } from "firebase-admin";
import { DocumentData } from "firebase-admin/firestore";

export const getDocuments = async (
  collectionName: string
): Promise<DocumentData[]> => {
  const fs = firestore();
  const ref = fs.collection(collectionName);
  const snapshot = await ref.get();
  return snapshot.docs.map((doc) => doc.data());
};
