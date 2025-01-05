import { Modal } from "antd";
export const Modal = ({ isModalOpen, setIsModalOpen }) => {
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <Modal
      title="Вы уверены, что хотите удалить заметку?"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    />
  );
};
