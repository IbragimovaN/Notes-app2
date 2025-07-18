import { Note } from "../../types";
import { addNoteToMongo } from "../api_mongo";
import { openDB } from "../openDB";

export const createNoteToIndexedDB = async (note: Note): Promise<Note> => {
  const db: IDBDatabase = await openDB();

  const tx = db.transaction("noteData", "readwrite");
  const store = tx.objectStore("noteData");
  const request = store.put(note);

  return new Promise((resolve, reject) => {
    request.onsuccess = async () => {
      if (!note._id) {
        throw Error("error id note");
      }
      const requestNoteAdded = store.get(note._id);

      requestNoteAdded.onsuccess = (event) => {
        if (event.target) {
          // Проверка на null
          resolve((event.target as IDBRequest).result);
          addNoteToMongo((event.target as IDBRequest).result);
        } else {
          reject(new Error("Event target is null"));
        }
      };
    };
    request.onerror = (event) => {
      console.log("Error creating note:", event);
      reject(event);
    };
  });
};
