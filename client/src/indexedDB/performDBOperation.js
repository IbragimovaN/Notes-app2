import { idb } from "./createDB";

// Вспомогательная функция для работы с IndexedDB
export const performDBOperation = async (
  operation,
  storeName,
  params = null
) => {
  const dbPromise = idb.open("notesDB", 2);
  return new Promise((resolve, reject) => {
    dbPromise.onsuccess = () => {
      const db = dbPromise.result;

      const tx = db.transaction(
        storeName,
        operation === "read" ? "readonly" : "readwrite"
      );
      const store = tx.objectStore(storeName);

      let request;
      if (operation === "getAll") {
        const { searchPhrase, page, limit } = params;
        request = store.getAll(); // Получаем все заметки

        request.onsuccess = (event) => {
          let notes = event.target.result;

          // Фильтрация по searchPhrase
          if (searchPhrase) {
            notes = notes.filter(
              (note) =>
                note.title.includes(searchPhrase) ||
                note.content.includes(searchPhrase)
            );
          }

          // Пагинация
          const startIndex = (page - 1) * limit;
          const paginatedNotes = notes.slice(startIndex, startIndex + limit);
          resolve(paginatedNotes);
        };
      } else if (operation === "get") {
        request = store.get(params);
      } else if (operation === "put") {
        console.log("operation === put");
        request = store.put(params);
        request.onsuccess = (event) => {
          resolve(params);
        };
      } else if (operation === "delete") {
        request = store.delete(params);
      }

      request.onerror = (event) => {
        console.log("error", event);
        reject(event);
      };

      tx.oncomplete = () => {
        db.close();
      };
    };
  });
};
