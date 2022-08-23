import { initFirebaseApp } from "./firebase";
import { getDocumentData } from "./firestore";
import { collectionName, docId } from "./constants";

initFirebaseApp();

getDocumentData(collectionName, docId)
  .then((res) => console.log(res))
  .catch((e) => console.error(e));
