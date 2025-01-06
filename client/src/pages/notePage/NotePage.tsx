import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { Typography, Button, Flex, Modal } from "antd";
import { ControlPanel } from "./components/controlPanel/ControlPanel";
import { ControlTwoTone, RollbackOutlined } from "@ant-design/icons";
import { CreateNoteField } from "../../components";
import { ErrorServer } from "../../components/errorServer/ErrorServer";
import { Note } from "../../types";

const { Title, Paragraph } = Typography;

export const NotePage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [editable, setEditable] = useState<boolean>(false);
  const [note, setNote] = useState<Note>({ title: "", text: "" });
  const [open, setOpen] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onChangeNote = () => {
    axios
      .patch(`/api/notes/${params.id}`, {
        title: note.title,
        text: note.text,
      })
      .then((data) => {
        if (data.data.error) {
          setErrorMessage(data.data.error);
        }
        setEditable(false);
      });
  };

  const handleOk = () => {
    setIsModalOpen(false);
    axios.delete(`/api/notes/${params.id}`).then((data) => {
      if (data.data.error) {
        setErrorMessage(data.data.error);
      } else {
        navigate("/");
      }
    });
  };

  useEffect(() => {
    axios.get(`/api/notes/${params.id}`).then((data) => {
      if (data.data.error) {
        navigate("../notFound");
      }
      setNote(data.data.data);
    });
  }, [params.id]);

  return (
    <>
      <Button
        type="link"
        onClick={() => setOpen(true)}
        style={{ right: 0, position: "absolute" }}
        disabled={editable}
        icon={
          <ControlTwoTone twoToneColor="#722ed1" style={{ fontSize: "25px" }} />
        }
      />
      <Button
        type="link"
        onClick={() => navigate(-1)}
        style={{ left: 0, position: "absolute" }}
        icon={
          <RollbackOutlined style={{ fontSize: "25px", color: "#722ed1" }} />
        }
      />

      {editable ? (
        <CreateNoteField note={note} setNote={setNote} />
      ) : (
        <>
          {" "}
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
      {errorMessage && <ErrorServer errorMessage={errorMessage} />}

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
  );
};
