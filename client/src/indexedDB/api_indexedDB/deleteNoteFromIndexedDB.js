import { deleteNoteFromMongo } from "../api_mongo";
import { openDB } from "../openDB";

export const deleteNoteFromIndexedDB = async (id) => {
  const db = await openDB();
  const tx = db.transaction("noteData", "readwrite");
  const store = tx.objectStore("noteData");
  const request = store.delete(id);

  return new Promise((resolve, reject) => {
    request.onsuccess = async (event) => {
      await deleteNoteFromMongo(id);
      resolve(event.target.result);
    };
    request.onerror = (event) => {
      console.log("Error deleting note:", event);
      reject(event);
    };
  });
};
