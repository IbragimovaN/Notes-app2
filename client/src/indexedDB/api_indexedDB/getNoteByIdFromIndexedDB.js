import { openDB } from "../openDB";

export const getNoteByIdFromIndexedDB = async (id) => {
  const db = await openDB();
  const tx = db.transaction("noteData", "readonly");
  const store = tx.objectStore("noteData");
  const request = store.get(id);

  return new Promise((resolve, reject) => {
    request.onsuccess = (event) => resolve(event.target.result);
    request.onerror = (event) => {
      console.log("Error fetching note:", event);
      reject(event);
    };
  });
};
