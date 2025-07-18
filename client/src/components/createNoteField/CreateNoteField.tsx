import { Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Note } from "../../types";
export interface CreateNoteFieldProps {
  note: Note;
  setNote: (note: Note) => void;
}

export const CreateNoteField = ({ note, setNote }: CreateNoteFieldProps) => {
  return (
    <>
      <Input
        onChange={(e) => setNote({ ...note, title: e.target.value })}
        value={note.title}
        style={{
          color: " rgba(0, 0, 0, 0.88)",
          fontWeight: 600,
          fontSize: "38px",
          lineHeight: 1.2105263157894737,
        }}
      />
      <TextArea
        onChange={(e) => setNote({ ...note, text: e.target.value })}
        value={note.text}
        autoSize={{ minRows: 3 }}
      />
    </>
  );
};
