import axios from "axios";
import { BASE_URL } from "../../constants";
import { savePendingRequest } from "../api_indexedDB";

export const getNotesFromMongo = () => {
  return axios
    .get(`${BASE_URL}/notes`, { withCredentials: true })
    .then((response) => {
      return response.data.notes;
    })
    .catch((error) => {
      console.log("Error getting notes from server:", error);
      return null;
    });
};
