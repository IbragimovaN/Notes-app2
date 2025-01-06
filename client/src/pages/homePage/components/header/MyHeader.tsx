import { Header } from "antd/es/layout/layout";
import { useNavigate } from "react-router";
import { UserOutlined, MenuOutlined } from "@ant-design/icons";
import { useAuth } from "../../../../context/AuthProvider";
import { Typography, Flex, Avatar, Menu, Button } from "antd";
import { navMenuItems } from "../../helpers/NavMenuItems";
import axios from "axios";

export const MyHeader = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const onExit = () => {
    axios.post("/api/logout").then((data) =>
      auth.logout(() => {
        navigate("signIn");
      })
    );
  };
  const onClickMenu = (e) => {
    const routes = {
      exit: onExit,
      signup: () => navigate("signUp"),
      signin: () => navigate("signIn"),
      home: () => navigate("/"),
      about: () => navigate("about"),
    };

    if (routes[e.key]) {
      routes[e.key]();
    }
  };

  return (
    <Header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div> Notes App</div>

      <Menu
        mode="horizontal"
        items={navMenuItems(auth.user)}
        theme="dark"
        onClick={(e) => onClickMenu(e)}
        style={{ flex: 1, minWidth: 0, maxWidth: "400px" }}
        overflowedIndicator={<MenuOutlined />}
      />
      {auth.user && (
        <Flex gap="small" align="center">
          <Avatar
            style={{ backgroundColor: "#87d068" }}
            icon={<UserOutlined />}
          />{" "}
          <Typography style={{ color: "#fff" }}>{auth.user.name}</Typography>
        </Flex>
      )}
    </Header>
  );
};
