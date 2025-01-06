import { Button, Form, Input, Card, Typography } from "antd";
import axios from "axios";
import { useAuth } from "../../context/authProvider";
import { useNavigate } from "react-router";
import { useState } from "react";

export const SignUpPage = () => {
  const { Text } = Typography;
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = (value: string) => {
    axios
      .post("/api/register", value)
      .then((data) =>
        data.data.error ? setErrorMessage(data.data.error) : navigate("/signIn")
      );
  };

  return (
    <Card>
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
