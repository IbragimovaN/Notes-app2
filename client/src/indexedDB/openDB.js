import { idb } from "./createDB";

export const openDB = async () => {
  return new Promise((resolve, reject) => {
    const dbPromise = idb.open("notesDB", 2);
    dbPromise.onsuccess = () => resolve(dbPromise.result);
    dbPromise.onerror = (event) => reject(event);
  });
};
