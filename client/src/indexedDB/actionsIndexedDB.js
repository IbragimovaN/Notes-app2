// import { addNoteToMongo } from "./api_mongo/addNoteToMongo";
// import { performDBOperation } from "./performDBOperation";

// export const getAllNotesFromIndexedDB = async (
//   searchPhrase = "",
//   page = 1,
//   limit = 10
// ) => {
//   return await performDBOperation("getAll", "noteData", {
//     searchPhrase,
//     page,
//     limit,
//   });
// };

// export const getNoteByIdFromIndexedDB = async (id) => {
//   try {
//     const note = await performDBOperation("get", "noteData", id);
//   } catch (error) {
//     console.log("Error fetching note:", error);
//   }
// };

// export const createNoteToIndexedDB = async (note) => {
//   try {
//     const noteAdded = await performDBOperation("put", "noteData", note);

//     addNoteToMongo(noteAdded);
//     return noteAdded;
//   } catch (error) {
//     console.log("Error creating note:", error);
//   }
// };

// export const deleteNoteFromIndexedDB = async (id) => {
//   try {
//     await performDBOperation("delete", "noteData", id);
//     syncDeleteWithServer(id); // Синхронизируем удаление с сервером
//   } catch (error) {
//     console.log("Error deleting note:", error);
//   }
// };

// export const editNoteIndexedDB = async (note) => {
//   try {
//     await performDBOperation("put", "noteData", note);
//     syncWithServer(note);
//   } catch (error) {
//     console.log("Error editing note:", error);
//   }
// };
