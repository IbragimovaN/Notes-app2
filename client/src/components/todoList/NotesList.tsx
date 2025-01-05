import { Button, List, Input, Modal } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import TextArea from "antd/es/input/TextArea";
import { Link } from "react-router";
import { CreateNoteField } from "../createNoteField/CreateNoteField";
export const NotesList = () => {
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState({ title: "", text: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOk = () => {
    axios
      .post("/api/notes", {
        title: note.title,
        text: note.text,
      })
      .then((data) => setNotes([data.data.data, ...notes]));
    setIsModalOpen(false);
  };

  useEffect(() => {
    axios.get("/api/notes").then((data) => setNotes(data.data.data.notes));
  }, []);

  return (
    <>
      <Button shape="circle" onClick={() => setIsModalOpen(true)}>
        +
      </Button>
      <Modal
        title="Новая заметка"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
      >
        <CreateNoteField note={note} setNote={setNote} />
      </Modal>
      <List
        dataSource={notes}
        renderItem={(note) => (
          <List.Item>
            <Link to={`/${note._id}`}> {note.title}</Link>
          </List.Item>
        )}
      />
    </>
  );
};
