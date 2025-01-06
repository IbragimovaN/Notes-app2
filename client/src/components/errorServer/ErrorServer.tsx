import { Typography } from "antd";

interface ErrorServerProps {
  errorMessage: string;
}
export const ErrorServer = ({ errorMessage }: ErrorServerProps) => {
  const { Text } = Typography;
  return (
    <Text style={{ textAlign: "center" }} type="danger">
      Ошибка сервера: {errorMessage} Попробуйте позже
    </Text>
  );
};
