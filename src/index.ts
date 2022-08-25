import { initFirebaseApp } from "./firebase";
import { getDocumentData, checkTimeStamp } from "./firestore";
import { collectionName, docId } from "./constants";

initFirebaseApp();

getDocumentData(collectionName, docId)
  .then((res) => {
    checkTimeStamp(res);
    console.log(res);
  })
  .catch((e) => console.error(e));
