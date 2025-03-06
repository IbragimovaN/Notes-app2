import { getIdb } from "./createDB";

export const openDB = async (): Promise<IDBDatabase> => {
  const idb = getIdb();

  if (!idb) {
    throw new Error("IndexedDB not supported");
  }
  return new Promise<IDBDatabase>((resolve, reject) => {
    const dbPromise: IDBOpenDBRequest = idb.open("notesDB", 2);
    dbPromise.onsuccess = () => resolve(dbPromise.result);
    dbPromise.onerror = (event: Event) => reject(event);
  });
};
