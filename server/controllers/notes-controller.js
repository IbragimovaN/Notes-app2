import Note from "../models/note-model.js";

async function addNote(note) {
  const newNote = await Note.create(note);
  return newNote;
}

async function editNote(id, newData) {
  console.log("controller", id, newData); //выходят верные данные
  try {
    const updatedNote = await Note.findByIdAndUpdate(id, newData, {
      returnDocument: "after",
    });
    console.log(updatedNote); //выходит null
    return updatedNote;
  } catch (error) {
    throw new Error("Не найдено");
  }
}

async function deleteNote(id) {
  return await Note.deleteOne({ _id: id });
}

async function getNotes(search = "", limit, page) {
  const [notes, count] = await Promise.all([
    Note.find({ title: { $regex: search, $options: "i" } })
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 }),
    Note.countDocuments({ title: { $regex: search, $options: "i" } }),
  ]);
  return {
    notes,
    lastPage: Math.ceil(count / limit),
  };
}

async function getNote(id) {
  try {
    const currentNote = await Note.findOne({ _id: id });
    if (!currentNote) {
      throw new Error("Не найдено");
    } else {
      return currentNote;
    }
  } catch (error) {
    throw new Error("Не найдено");
  }
}

export { addNote, editNote, deleteNote, getNotes, getNote };
