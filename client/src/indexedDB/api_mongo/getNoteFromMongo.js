import axios from "axios";
import { BASE_URL } from "../../constants";

export const getNoteFromMongo = (id) => {
  return axios
    .get(`${BASE_URL}/notes/${id}`, { withCredentials: true })
    .then((response) => {
      if (response.data.error) {
        console.log("error:", response.data.error);
      } else {
        console.log("Note synced with server:", response.data.notes);
      }
    })
    .catch((error) => {
      console.error("Note editing to mongo error:", error);
      // Если ошибка, можно сохранить запрос для повторной отправки позже
      savePendingRequest("get", note);
    });
};
