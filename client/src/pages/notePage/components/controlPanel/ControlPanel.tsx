import { Button, Drawer } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

export const ControlPanel = ({
  editable,
  setEditable,
  open,
  setOpen,
  setIsModalOpen,
}) => {
  console.log("contrlPanel", open);

  const onClickEditable = () => {
    setEditable(!editable);
    setOpen(false);
  };
  return (
    <Drawer
      title="Панель управления"
      onClose={() => setOpen(false)}
      open={open}
    >
      <p>
        {" "}
        <Button type="link" onClick={onClickEditable} icon={<EditOutlined />}>
          Редактировать
        </Button>
      </p>
      <p>
        <Button
          type="link"
          icon={<DeleteOutlined />}
          onClick={() => setIsModalOpen(true)}
        >
          Удалить
        </Button>
      </p>
    </Drawer>
  );
};
