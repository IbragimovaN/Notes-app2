export const fetchAndFilterNotes = (notes, searchPhrase, page, limit) => {
  // Фильтрация по searchPhrase
  if (searchPhrase) {
    notes = notes.filter(
      (note) =>
        note.title.toLowerCase().includes(searchPhrase.toLowerCase()) ||
        note.text.includes(searchPhrase.toLowerCase())
    );
  }
  //сортировка
  notes = notes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  // Пагинация
  const startIndex = (page - 1) * limit;
  return notes.slice(startIndex, startIndex + limit);
};
