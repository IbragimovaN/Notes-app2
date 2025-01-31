import { getNotesFromMongo } from "../api_mongo";
import { openDB } from "../openDB";
import { fetchAndFilterNotes } from "../utils/fetchAndFilterNotes";

export const getAllNotesFromIndexedDB = async (
  searchPhrase = "",
  page = 1,
  limit = 10
) => {
  const mongoNotes = await getNotesFromMongo();
  const db = await openDB();
  const tx = db.transaction("noteData", "readwrite");
  const store = tx.objectStore("noteData");
  let request;
  return new Promise((resolve, reject) => {
    if (mongoNotes) {
      mongoNotes.forEach((note) => store.put(note));
    }
    request = store.getAll();

    request.onsuccess = (event) => {
      const notes = event.target.result;
      const filteredNotes = fetchAndFilterNotes(
        notes,
        searchPhrase,
        page,
        limit
      );
      const lastPage = Math.ceil(
        searchPhrase ? filteredNotes.length / limit : notes.length / limit
      );
      console.log("lastPage", lastPage);
      resolve({ notes: filteredNotes, lastPage });
    };
    request.onerror = (event) => {
      console.log("Error :", event);
      reject(event);
    };

    db.close();
  });
};
