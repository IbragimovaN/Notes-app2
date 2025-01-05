import { Button, Form, Input, Card } from "antd";
import axios from "axios";
import { useAuth } from "../../context/authProvider";
import { useNavigate } from "react-router";

export const SignUpPage = () => {
  const navigate = useNavigate();

  const handleSubmit = (value: string) => {
    axios
      .post("/api/register", value)
      .then((data) =>
        data.data.error ? console.log(data.data.error) : navigate("/signIn")
      );
  };

  return (
    <Card>
      {" "}
      <Form onFinish={handleSubmit} size="large" layout="vertical">
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
    </Card>
  );
};
