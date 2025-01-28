export const fetchAndFilterNotes = (notes, searchPhrase, page, limit) => {
  // Фильтрация по searchPhrase
  if (searchPhrase) {
    notes = notes.filter(
      (note) =>
        note.title.includes(searchPhrase) || note.content.includes(searchPhrase)
    );
  }
  // Пагинация
  const startIndex = (page - 1) * limit;
  return notes.slice(startIndex, startIndex + limit);
};
