import { firestore } from "firebase-admin";

export const getDocumentData = async (
  collectionName: string,
  documentId: string
): Promise<firestore.DocumentData | undefined> => {
  const fs = firestore();
  const docRef = fs.collection(collectionName).doc(documentId);
  const docSnapShot = await docRef.get();
  const docData = docSnapShot.data();
  return docData;
};
