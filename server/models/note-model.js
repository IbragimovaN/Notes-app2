import mongoose from "mongoose";

const NoteSchema = mongoose.Schema(
  {
    _id: { type: String, required: true },
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Note", NoteSchema);
