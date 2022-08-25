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

export const checkTimeStamp = (arg: firestore.DocumentData | undefined) => {
  if (!arg) return;
  if (arg.timestampField) {
    const fsTimeStamp = arg.timestampField;
    const dateFromFirestoreTimeStamp = arg.timestampField.toDate();
    console.log(dateFromFirestoreTimeStamp);
    console.log(fsTimeStamp instanceof firestore.FieldValue);
    console.log(dateFromFirestoreTimeStamp instanceof Date);
    console.log(fsTimeStamp);
  }
};
