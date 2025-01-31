import {
  addNoteToMongo,
  deleteNoteFromMongo,
  editNoteFromMongo,
} from "../api_mongo";
import { openDB } from "../openDB";

// Функция для обработки отложенных запросов Обработка отложенных запросов: Функция processPendingRequests извлекает все отложенные запросы и пытается их выполнить, когда соединение восстанавливается.
export const processPendingRequests = async () => {
  const db = await openDB();
  const tx = db.transaction("pendingRequests", "readonly");
  const pendingRequestsStore = tx.objectStore("pendingRequests");
  const request = await pendingRequestsStore.getAll();

  return new Promise((resolve) => {
    request.onsuccess = async (event) => {
      const allRequests = event.target.result;
      if (allRequests.length === 0) {
        // Если отложенных запросов нет, просто закрываем базу данных
        db.close();
        resolve();
        return; // Прерываем выполнение функции
      }

      for (const { type, data } of allRequests) {
        if (type === "create") {
          await addNoteToMongo(data);
        } else if (type === "delete") {
          await deleteNoteFromMongo(data.id);
        } else if (type === "edit") {
          await editNoteFromMongo(data._id, data);
        }
      }

      // Очистка отложенных запросов после их обработки
      const clearTx = db.transaction("pendingRequests", "readwrite");
      const clearStore = clearTx.objectStore("pendingRequests");
      clearStore.clear();

      clearTx.oncomplete = () => {
        db.close();
        resolve();
      };
    };
  });
};
