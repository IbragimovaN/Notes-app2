import axios from "axios";
import { BASE_URL } from "../../constants";

export const getNotesFromMongo = () => {
  return axios
    .get(`${BASE_URL}/notes`, { withCredentials: true })
    .then((response) => {
      return response.data.notes;
    })
    .catch((error) => {
      console.log("Error getting notes from server:", error);
      // Если ошибка, можно сохранить запрос для повторной отправки позже
      // savePendingRequest("getAll", note);
      return null;
    });
};
