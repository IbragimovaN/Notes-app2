import { Note } from "../../types";

export const fetchAndFilterNotes = (
  notes: Note[],
  searchPhrase: string,
  page: number,
  limit: number
) => {
  // Фильтрация по searchPhrase
  if (searchPhrase) {
    notes = notes.filter(
      (note) =>
        note.title.toLowerCase().includes(searchPhrase.toLowerCase()) ||
        note.text.includes(searchPhrase.toLowerCase())
    );
  }
  //сортировка
  notes = notes.sort((a: Note, b: Note) => {
    if (a.createdAt && b.createdAt) {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    return 0;
  });
  // Пагинация
  const startIndex = (page - 1) * limit;
  return notes.slice(startIndex, startIndex + limit);
};
