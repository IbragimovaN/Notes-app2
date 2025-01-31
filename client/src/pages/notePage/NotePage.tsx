import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Typography, Button, Flex, Modal, Spin } from "antd";
import { ControlPanel } from "./components/controlPanel/ControlPanel";
import { ControlTwoTone, RollbackOutlined } from "@ant-design/icons";
import { CreateNoteField } from "../../components";
import { Note } from "../../types";

import {
  deleteNoteFromIndexedDB,
  editNoteIndexedDB,
  getNoteByIdFromIndexedDB,
} from "../../indexedDB/api_indexedDB";

const { Title, Paragraph } = Typography;

export const NotePage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [editable, setEditable] = useState<boolean>(false);
  const [note, setNote] = useState<Note>({ title: "", text: "" });
  const [open, setOpen] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const onChangeNote = () => {
    setLoading(true);
    editNoteIndexedDB({
      title: note.title,
      text: note.text,
      _id: params.id,
    }).then(() => {
      setLoading(false);
      setEditable(false);
    });
  };

  const handleOk = () => {
    setIsModalOpen(false);
    deleteNoteFromIndexedDB(params.id).then(() => {
      navigate("/");
    });
  };

  useEffect(() => {
    setLoading(true);
    getNoteByIdFromIndexedDB(params.id).then((note) => {
      setNote(note);
      // setLoading(false);
    });
  }, [params.id]);

  return (
    <>
      {loading ? (
        <Flex justify="center" align="center" style={{ height: "400px" }}>
          <Spin />
        </Flex>
      ) : (
        <>
          <Button
            type="link"
            onClick={() => setOpen(true)}
            style={{ right: 0, position: "absolute" }}
            disabled={editable}
            icon={
              <ControlTwoTone
                twoToneColor="#722ed1"
                style={{ fontSize: "25px" }}
              />
            }
          />
          <Button
            type="link"
            onClick={() => navigate(-1)}
            style={{ left: 0, position: "absolute" }}
            icon={
              <RollbackOutlined
                style={{ fontSize: "25px", color: "#722ed1" }}
              />
            }
          />

          {editable ? (
            <CreateNoteField note={note} setNote={setNote} />
          ) : (
            <>
              <Title>{note?.title}</Title>
              <Paragraph>{note?.text}</Paragraph>
            </>
          )}

          {editable && (
            <Flex gap="small">
              <Button onClick={() => setEditable(!editable)}>Отменить </Button>
              <Button onClick={onChangeNote}>Сохранить</Button>
            </Flex>
          )}

          <ControlPanel
            editable={editable}
            setEditable={setEditable}
            open={open}
            setOpen={setOpen}
            setIsModalOpen={setIsModalOpen}
          />
          <Modal
            title="Вы уверены, что хотите удалить заметку?"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={() => setIsModalOpen(false)}
          />
        </>
      )}
    </>
  );
};
