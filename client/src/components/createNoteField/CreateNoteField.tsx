import { Input } from "antd";
import TextArea from "antd/es/input/TextArea";

export const CreateNoteField = ({ note, setNote }) => {
  return (
    <>
      <Input
        onChange={(e) => setNote({ ...note, title: e.target.value })}
        value={note.title}
        style={{
          marginBttom: "0.5em",
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
