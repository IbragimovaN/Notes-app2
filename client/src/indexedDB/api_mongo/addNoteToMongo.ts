import axios from "axios";
import { BASE_URL } from "../../constants";
import { savePendingRequest } from "../api_indexedDB";
import { Note } from "../../types";

export const addNoteToMongo = (note: Note) => {
  axios
    .post(`${BASE_URL}/notes`, note, { withCredentials: true })
    .then((response) => {
      console.log("Note synced with server:", response.data);
    })
    .catch((error) => {
      console.log("Error adding notes to server::", error);
      // Если ошибка, можно сохранить запрос для повторной отправки позже
      savePendingRequest("create", note);
    });
};
