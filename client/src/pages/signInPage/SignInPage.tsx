import { Button, Form, Input, message } from "antd";
import axios from "axios";
import { useAuth } from "../../context/authProvider";
import { useNavigate } from "react-router";

export const SignInPage = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const auth = useAuth();
  const handleSubmit = (value: string) => {
    axios.post("/api/login", value).then((data) => {
      const { user, error } = data.data;

      if (error) {
        console.log(error);
        return <div> error</div>;
      } else {
        console.log(user);
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
      <Form onFinish={handleSubmit} size="large" layout="vertical">
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
    </>
  );
};
