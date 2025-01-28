import { addNoteToMongo } from "../api_mongo";
import { openDB } from "../openDB";

export const createNoteToIndexedDB = async (note) => {
  const db = await openDB();
  const tx = db.transaction("noteData", "readwrite");
  const store = tx.objectStore("noteData");
  const request = store.put(note);

  return new Promise((resolve, reject) => {
    request.onsuccess = async (event) => {
      const requestNoteAdded = store.get(note._id);
      requestNoteAdded.onsuccess = async (event) => {
        await addNoteToMongo(event.target.result);
        resolve(event.target.result);
      };
    };
    request.onerror = (event) => {
      console.log("Error creating note:", event);
      reject(event);
    };
  });
};
