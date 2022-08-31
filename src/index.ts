import { writeFileSync } from "fs";
import { program } from "commander";
import { initFirebaseApp } from "./firebase";
import { getDocuments } from "./firestore";
import { convertDocs } from "./convert/convert";
import { DocsIntegrater } from "./join/join";
import { ViewTextBuilder } from "./view/builder";

program.option("-c, --collection <collectionName>");
program.parse();

initFirebaseApp();
const main = async () => {
  const opts = program.opts();
  const collectionName = opts.collection as string;
  const docs = await getDocuments(collectionName);
  const convertedDocs = convertDocs(docs);
  const integrater = new DocsIntegrater(convertedDocs);
  const [joinReslt, joinMeta] = integrater.joinDocs();
  const builder = new ViewTextBuilder(joinReslt, joinMeta);
  const text = builder.build("document");
  writeFileSync("output.ts", text);
};

main().catch((err) => console.error(err));
