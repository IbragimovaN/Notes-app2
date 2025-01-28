import axios from "axios";
import { BASE_URL } from "../../constants";
// Функция для сохранения отложенного запроса
const savePendingRequest = (type, data) => {
  const dbPromise = idb.open("notesDB", 2);
  dbPromise.onsuccess = () => {
    const db = dbPromise.result;
    const tx = db.transaction("pendingRequests", "readwrite");
    const pendingRequestsStore = tx.objectStore("pendingRequests");
    pendingRequestsStore.put({ type, data, timestamp: Date.now() });
    tx.oncomplete = () => {
      db.close();
    };
  };
}; // Функция для обработки отложенных запросов Обработка отложенных запросов: Функция processPendingRequests извлекает все отложенные запросы и пытается их выполнить, когда соединение восстанавливается.
const processPendingRequests = () => {
  const dbPromise = idb.open("notesDB", 2);
  dbPromise.onsuccess = () => {
    const db = dbPromise.result;
    const tx = db.transaction("pendingRequests", "readonly");
    const pendingRequestsStore = tx.objectStore("pendingRequests");
    const getAllRequests = pendingRequestsStore.getAll();
    getAllRequests.onsuccess = () => {
      const requests = getAllRequests.result;
      requests.forEach((request) => {
        if (request.type === "create") {
          syncWithServer(request.data);
        } else if (request.type === "delete") {
          syncDeleteWithServer(request.data.id);
        }
      }); // После обработки можно удалить отложенные запросы
      const deleteTx = db.transaction("pendingRequests", "readwrite");
      const deleteStore = deleteTx.objectStore("pendingRequests");
      requests.forEach((request) => {
        deleteStore.delete(request.timestamp);
      });
      deleteTx.oncomplete = () => {
        db.close();
      };
    };
  };
}; // Вызов функции для обработки отложенных запросов при восстановлении соединения Событие online: Добавляется обработчик события, который вызывает processPendingRequests, когда устройство восстанавливает соединение с интернетом.
window.addEventListener("online", processPendingRequests);
