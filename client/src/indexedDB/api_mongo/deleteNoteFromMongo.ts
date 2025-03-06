import axios from "axios";
import { BASE_URL } from "../../constants";
import { savePendingRequest } from "../api_indexedDB";
import { Note } from "../../types";

export const deleteNoteFromMongo = (id: Note["_id"]) => {
  axios
    .delete(`${BASE_URL}/notes/${id}`, { withCredentials: true })
    .then((response) => {
      console.log("Note deleted from server:", response.data);
    })
    .catch((error) => {
      console.log("Error deleting note from server:", error);
      // Если ошибка, можно сохранить запрос для повторной отправки позже
      savePendingRequest("delete", { id });
    });
};
