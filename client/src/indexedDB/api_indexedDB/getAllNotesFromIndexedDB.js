// import { openDB } from "../openDB";

// export const getAllNotesFromIndexedDB = async (
//   searchPhrase = "",
//   page = 1,
//   limit = 10
// ) => {
//   const db = await openDB();
//   try {
//     const mongoNotes = await getNotesFromMongo();
//     const tx = db.transaction("noteData", "readwrite");
//     const store = tx.objectStore("noteData");
//     await store.clear();
//     mongoNotes.forEach((note) => store.put(note));

//     const finalTx = db.transaction("noteData", "readonly");
//     const finalStore = finalTx.objectStore("noteData");
//     const request = finalStore.getAll();

//     return new Promise((resolve) => {
//       request.onsuccess = (event) => {
//         const notes = event.target.result;
//         const filteredNotes = fetchAndFilterNotes(
//           notes,
//           searchPhrase,
//           page,
//           limit
//         );
//         resolve(filteredNotes);
//       };
//     });
//   } catch (error) {
//     console.error("Ошибка получения заметок с сервера:", error);
//     const tx = db.transaction("noteData", "readonly");
//     const store = tx.objectStore("noteData");
//     const request = store.getAll();

//     return new Promise((resolve) => {
//       request.onsuccess = (event) => {
//         const notes = event.target.result;
//         const filteredNotes = fetchAndFilterNotes(
//           notes,
//           searchPhrase,
//           page,
//           limit
//         );
//         resolve(filteredNotes);
//       };
//     });
//   } finally {
//     db.close();
//   }
// };

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
      resolve(filteredNotes);
    };
    request.onerror = (event) => {
      console.log("Error :", event);
      reject(event);
    };

    db.close();
  });
};
