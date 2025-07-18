import { Note } from "../../types";
import { openDB } from "../openDB";

// Функция для получения заметки по ID из IndexedDB
export const getNoteByIdFromIndexedDB = async (
  id: Note["_id"]
): Promise<Note> => {
  const db = await openDB();
  const tx = db.transaction("noteData", "readonly");
  const store = tx.objectStore("noteData");
  if (id === undefined) {
    throw new Error("ID cannot be undefined");
  }
  const request = store.get(id);

  return new Promise((resolve, reject) => {
    request.onsuccess = (event) => {
      const result = (event.target as IDBRequest).result;
      if (result) {
        resolve(result); // Возвращаем найденную заметку
      } else {
        resolve({ title: "", text: "", _id: id }); // Возвращаем пустую заметку, если не найдена
      }
    };
    request.onerror = (event) => {
      console.log("Error fetching note:", event);
      reject(event);
    };
  });
};
