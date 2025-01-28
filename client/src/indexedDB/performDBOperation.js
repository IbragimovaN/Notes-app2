// import { getNotesFromMongo } from "./api_mongo/getNotesFromMongo";
// import { idb } from "./createDB";

// // Вспомогательная функция для работы с IndexedDB
// export const performDBOperation = async (
//   operation,
//   storeName,
//   params = null
// ) => {
//   const dbPromise = idb.open("notesDB", 2);
//   return new Promise((resolve, reject) => {
//     dbPromise.onsuccess = () => {
//       const db = dbPromise.result;

//       const tx = db.transaction(
//         storeName,
//         operation === "read" ? "readonly" : "readwrite"
//       );
//       const store = tx.objectStore(storeName);

//       let request;
//       if (operation === "getAll") {
//         getNotesFromMongo()
//           .then((mongoNotes) => {
//             console.log(mongoNotes, "mongoNotes");
//             // Удаляем все заметки из локальной базы данных
//             // const deleteRequest = store.clear();
//             // deleteRequest.onsuccess = () => {
//             // Добавляем заметки из MongoDB в локальную базу данных
//             request = mongoNotes.forEach((note) => store.put(note));
//             request.onsuccess = (event) => {
//               resolve(params);
//             };
//             request.onerror = (error) => {
//               console.log(error);
//             };

//             // const { searchPhrase, page, limit } = params;
//             // const filteredNotes = fetchAndFilterNotes(
//             //   mongoNotes,
//             //   searchPhrase,
//             //   page,
//             //   limit
//             // );
//             // resolve(filteredNotes);
//             // };
//           })
//           .catch((error) => {
//             console.error("Ошибка получения заметок с сервера:", error);
//             const { searchPhrase, page, limit } = params;
//             request = store.getAll(); // Получаем все заметки
//             request.onsuccess = (event) => {
//               const notes = event.target.result;
//               const filteredNotes = fetchAndFilterNotes(
//                 notes,
//                 searchPhrase,
//                 page,
//                 limit
//               );
//               resolve(filteredNotes);
//             };
//           });

//         //если сервер не доступен или нте интернета код должен не ломаться, а заметки должны получать из db кодом ниже
//         const { searchPhrase, page, limit } = params;
//         request = store.getAll(); // Получаем все заметки

//         request.onsuccess = (event) => {
//           let notes = event.target.result;

//           // Фильтрация по searchPhrase
//           if (searchPhrase) {
//             notes = notes.filter(
//               (note) =>
//                 note.title.includes(searchPhrase) ||
//                 note.content.includes(searchPhrase)
//             );
//           }

//           // Пагинация
//           const startIndex = (page - 1) * limit;
//           const paginatedNotes = notes.slice(startIndex, startIndex + limit);
//           resolve(paginatedNotes);
//         };
//       } else if (operation === "get") {
//         request = store.get(params);
//       } else if (operation === "put") {
//         console.log("operation === put");
//         request = store.put(params);
//         request.onsuccess = (event) => {
//           resolve(params);
//         };
//       } else if (operation === "delete") {
//         request = store.delete(params);
//       }

//       request.onerror = (event) => {
//         console.log("error", event);
//         reject(event);
//       };

//       tx.oncomplete = () => {
//         db.close();
//       };
//     };
//   });
// };

//тут нет ошибки с зарытой транкзвкцией но есть ошибка другая
// import { getNotesFromMongo } from "./api/getNotesFromMongo";
// import { idb } from "./createDB";

// // Вспомогательная функция для работы с IndexedDB
// export const performDBOperation = async (
//   operation,
//   storeName,
//   params = null
// ) => {
//   const dbPromise = idb.open("notesDB", 2);
//   return new Promise((resolve, reject) => {
//     dbPromise.onsuccess = async () => {
//       const db = dbPromise.result;

//       if (operation === "getAll") {
//         try {
//           const mongoNotes = await getNotesFromMongo();
//           console.log(mongoNotes, "mongoNotes");

//           // Удаляем все заметки из локальной базы данных
//           const tx = db.transaction(storeName, "readwrite");
//           const store = tx.objectStore(storeName);
//           const deleteRequest = store.clear();

//           deleteRequest.onsuccess = () => {
//             // Добавляем заметки из MongoDB в локальную базу данных
//             mongoNotes.forEach((note) => store.put(note));
//           };

//           tx.oncomplete = async () => {
//             // После завершения транзакции, получаем все заметки
//             const finalTx = db.transaction(storeName, "readonly");
//             const finalStore = finalTx.objectStore(storeName);
//             const request = finalStore.getAll();

//             request.onsuccess = (event) => {
//               const notes = event.target.result;
//               const { searchPhrase, page, limit } = params;
//               const filteredNotes = fetchAndFilterNotes(
//                 notes,
//                 searchPhrase,
//                 page,
//                 limit
//               );
//               resolve(filteredNotes);
//             };
//           };
//         } catch (error) {
//           console.error("Ошибка получения заметок с сервера:", error);
//           // Обработка ошибки и получение заметок из базы данных
//           const tx = db.transaction(storeName, "readonly");
//           const store = tx.objectStore(storeName);
//           const request = store.getAll();

//           request.onsuccess = (event) => {
//             const notes = event.target.result;
//             const { searchPhrase, page, limit } = params;
//             const filteredNotes = fetchAndFilterNotes(
//               notes,
//               searchPhrase,
//               page,
//               limit
//             );
//             resolve(filteredNotes);
//           };
//         }
//       } else {
//         // Обработка других операций (get, put, delete)
//         const tx = db.transaction(
//           storeName,
//           operation === "put" ? "readwrite" : "readonly"
//         );
//         const store = tx.objectStore(storeName);
//         let request;

//         if (operation === "get") {
//           request = store.get(params);
//         } else if (operation === "put") {
//           request = store.put(params);
//         } else if (operation === "delete") {
//           request = store.delete(params);
//         }

//         request.onsuccess = (event) => {
//           resolve(event.target.result);
//         };

//         request.onerror = (event) => {
//           console.log("error", event);
//           reject(event);
//         };
//       }

//       db.close();
//     };
//   });
// };
