import axios from "axios";
import { BASE_URL } from "../../constants";

export const editNoteFromMongo = (id, editingNote) => {
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
      //savePendingRequest("edit", note);
    });
};
