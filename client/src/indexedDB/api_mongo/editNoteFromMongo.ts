import axios from "axios";
import { BASE_URL } from "../../constants";
import { savePendingRequest } from "../api_indexedDB";
import { Note } from "../../types";

export const editNoteFromMongo = (id: Note["_id"], editingNote: Note) => {
  axios
    .patch(`${BASE_URL}/notes/${id}`, editingNote, { withCredentials: true })
    .then((response) => {
      if (response.data.error) {
        console.log("Note editing to mongo error:", response.data.error);
      } else {
        console.log("Note synced with server:", response.data.data);
      }
    })
    .catch((error) => {
      console.log("Note editing to mongo error:", error);
      // Если ошибка, можно сохранить запрос для повторной отправки позже
      savePendingRequest("edit", editingNote);
    });
};
