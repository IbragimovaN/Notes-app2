import { Button, Form, Input, message, Card, Typography } from "antd";
import axios from "axios";
import { useAuth } from "../../context/AuthProvider";
import { useNavigate } from "react-router";
import { useState } from "react";

export const SignInPage = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const auth = useAuth();
  const { Text } = Typography;

  const handleSubmit = (value: { email: string; password: string }) => {
    axios
      .post("http://localhost:3003/login", value, { withCredentials: true })
      .then((data) => {
        const { user, error } = data.data;

        if (error) {
          setErrorMessage(error);
        } else {
          auth.login(user, () => {
            messageApi.open({
              type: "success",
              content: `Hello, ${user.name}`,
            });
            const timer = setTimeout(() => {
              navigate("/", {
                replace: true,
              });
            }, 2000);
            return () => clearTimeout(timer);
          });
        }
      });
  };

  return (
    <>
      {" "}
      {contextHolder}
      <Card style={{ maxWidth: 400, margin: "50px auto" }}>
        <Form
          onFinish={handleSubmit}
          size="large"
          layout="vertical"
          onChange={() => setErrorMessage(null)}
        >
          <Form.Item
            label="email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please come up password!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label={null}>
            <Button htmlType="submit" type="primary">
              sign in
            </Button>
          </Form.Item>
        </Form>
        {errorMessage && <Text type="danger">{errorMessage}</Text>}
      </Card>
    </>
  );
};
