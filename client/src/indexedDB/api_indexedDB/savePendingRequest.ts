import { Note } from "../../types";
import { openDB } from "../openDB";
// Функция для сохранения отложенного запроса
export const savePendingRequest = async (
  type: string,
  data: Note | { id: Note["_id"] }
) => {
  const db = await openDB(); // Используем openDB для открытия базы данных
  const tx = db.transaction("pendingRequests", "readwrite");

  const pendingRequestsStore = tx.objectStore("pendingRequests");
  pendingRequestsStore.put({ type, data, timestamp: Date.now() });

  tx.oncomplete = () => {
    db.close();
  };
};
