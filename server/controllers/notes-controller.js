import Note from "../models/note-model.js";

async function addNote(note, userId) {
  const newNote = await Note.create({ ...note, userId });

  return newNote;
}

async function editNote(id, newData, userId) {
  const updatedNote = await Note.findOneAndUpdate(
    { _id: id, userId },
    newData,
    { new: true }
  );
  if (!updatedNote) {
    throw new Error("Не найдено");
  }
  return updatedNote;
}

async function deleteNote(id, userId) {
  return await Note.deleteOne({ _id: id, userId });
}

async function getNotes(userId, search = "", limit, page) {
  const [notes, count] = await Promise.all([
    Note.find({
      userId,
      $or: [
        { title: { $regex: search, $options: "i" } },
        { text: { $regex: search, $options: "i" } },
      ],
    })
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 }),
    Note.countDocuments({
      userId,
      $or: [
        { title: { $regex: search, $options: "i" } },
        { text: { $regex: search, $options: "i" } },
      ],
    }),
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
