import { editNoteFromMongo } from "../api_mongo";
import { openDB } from "../openDB";

export const editNoteIndexedDB = async (note) => {
  const db = await openDB();
  const tx = db.transaction("noteData", "readwrite");
  const store = tx.objectStore("noteData");
  const request = store.put(note);

  return new Promise((resolve, reject) => {
    request.onsuccess = async (event) => {
      await editNoteFromMongo(note._id, note);
      resolve(event.target.result);
    };
    request.onerror = (event) => {
      console.log("Error editing note:", event);
      reject(event);
    };
  });
};
