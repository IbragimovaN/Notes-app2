import { Button, Form, Input } from "antd";

export const SignUpPage = () => {
  const handleSubmit = (value: string) => {
    console.log(value);
  };
  return (
    <Form onFinish={handleSubmit} size="large" layout="vertical">
      <Form.Item
        label="userName"
        name="userName"
        rules={[
          {
            required: true,
            message: "Please input your username!",
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
  );
};
