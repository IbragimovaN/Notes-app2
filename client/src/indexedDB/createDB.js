export const idb =
  window.indexedDB ||
  window.mozIndexedDB ||
  window.webkitIndexedDB ||
  window.msIndexedDB;

export const createCollectionIndexedDB = () => {
  // createCollectionIndexedDB создает бд
  if (!idb) {
    console.log("this is browser don't support IndexedDB");
    return;
  }
  const request = idb.open("notesDB", 2); // открывает  бд
  request.onerror = (event) => {
    console.log("error", event);
    console.log("An error occured with IndexedDB");
  };

  request.onupgradeneeded = (event) => {
    const db = event.target.result;
    if (!db.objectStoreNames.contains("noteData")) {
      //  проверяем, существует ли объектный магазин
      db.createObjectStore("noteData", {
        keyPath: "_id",
      });
    }

    if (!db.objectStoreNames.contains("pendingRequests")) {
      db.createObjectStore("pendingRequests", {
        keyPath: "timestamp",
      });
    }
  };
  request.onsuccess = () => {
    console.log("dataBase opened successfuly");
  };
};
