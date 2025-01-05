import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { Typography, Button, Flex, Input, Modal } from "antd";
import { ControlPanel } from "./components/controlPanel/ControlPanel";
import { ControlTwoTone, StarTwoTone } from "@ant-design/icons";
import { CreateNoteField } from "../../components";

const { Title, Paragraph } = Typography;

export const NotePage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [editable, setEditable] = useState(false);
  const [note, setNote] = useState({ title: "", text: "" });
  const [open, setOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onChangeNote = () => {
    axios
      .patch(`/api/notes/${params.id}`, {
        title: note.title,
        text: note.text,
      })
      .then((data) => {
        setEditable(false);
      });
  };

  const handleOk = () => {
    setIsModalOpen(false);
    axios.delete(`/api/notes/${params.id}`).then((data) => navigate("/"));
  };

  useEffect(() => {
    axios.get(`/api/notes/${params.id}`).then((data) => {
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
      >
        {" "}
        <ControlTwoTone twoToneColor="#722ed1" style={{ fontSize: "25px" }} />
      </Button>
      {editable ? (
        <CreateNoteField note={note} setNote={setNote} />
      ) : (
        <>
          {" "}
          <Title editable={editable ? { onChange: setTitle } : false}>
            {note.title}
          </Title>
          <Paragraph editable={editable ? { onChange: setText } : false}>
            {note.text}
          </Paragraph>
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
  );
};