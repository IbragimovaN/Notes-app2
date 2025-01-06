import { Typography } from "antd";
export const ErrorServer = ({ errorMessage }) => {
  const { Text } = Typography;
  return (
    <Text style={{ textAlign: "center" }} type="danger">
      Ошибка сервера: {errorMessage} Попробуйте позже
    </Text>
  );
};
