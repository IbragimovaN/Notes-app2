export const getIdb = (): IDBFactory | undefined => {
  const win = typeof window !== "undefined" ? window : undefined;
  if (!win) {
    console.error("indexedDB cannot get window");
    return;
  } else {
    return (
      win.indexedDB ||
      (win as any).mozIndexedDB ||
      (win as any).webkitIndexedDB ||
      (win as any).msIndexedDB
    );
  }
};

export const createCollectionIndexedDB = (): void => {
  const idb = getIdb();
  if (!idb) {
    console.error("indexDB not supported");
    return;
  }

  let db!: IDBDatabase;
  const request: IDBOpenDBRequest = idb.open("notesDB", 2); // открывает  бд
  request.onerror = (event: Event) => {
    console.log("error", event);
    console.log("An error occurred with IndexedDB");
  };

  request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
    db = (event.target as IDBOpenDBRequest).result;
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
    console.log("dataBase opened successfully");
  };
};
