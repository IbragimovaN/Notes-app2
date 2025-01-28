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
  request.onsuccess = (event) => {
    const allRequests = event.target.result;
    allRequests.forEach(({ type, data }) => {
      switch (type) {
        case "create":
          addNoteToMongo(data);
          break;
        case "delete":
          deleteNoteFromMongo(data.id);
          break;
        case "edit":
          editNoteFromMongo(data.id, data);
          break;
        default:
          break;
      }
    });
  };

  // Очистка отложенных запросов после их обработки
  const clearTx = db.transaction("pendingRequests", "readwrite");
  const clearStore = clearTx.objectStore("pendingRequests");
  clearStore.clear();

  clearTx.oncomplete = () => {
    db.close();
  };
};
