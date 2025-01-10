import { Button, Form, Input, Card, Typography } from "antd";
import axios from "axios";
import { useNavigate } from "react-router";
import { useState } from "react";
import { BASE_URL } from "../../constants";

export const SignUpPage = () => {
  const { Text } = Typography;
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = (value: { email: string; password: string }) => {
    axios
      .post(`${BASE_URL}/register`, value, { withCredentials: true })
      .then((data) =>
        data.data.error ? setErrorMessage(data.data.error) : navigate("/signIn")
      );
  };

  return (
    <Card style={{ maxWidth: 400, margin: "50px auto" }}>
      {" "}
      <Form
        onFinish={handleSubmit}
        size="large"
        layout="vertical"
        onChange={() => setErrorMessage(null)}
      >
        <Form.Item
          label="name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input your name!",
            },
          ]}
        >
          <Input />
        </Form.Item>
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
            sign up
          </Button>
        </Form.Item>
      </Form>
      {errorMessage && <Text type="danger">{errorMessage}</Text>}
    </Card>
  );
};
