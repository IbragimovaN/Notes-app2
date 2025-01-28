import axios from "axios";
import { BASE_URL } from "../../constants";

export const deleteNoteFromMongo = (id) => {
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
