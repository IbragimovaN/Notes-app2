import { Header } from "antd/es/layout/layout";
import { useNavigate } from "react-router";
import { UserOutlined, MenuOutlined } from "@ant-design/icons";
import { useAuth } from "../../../../context/AuthProvider";
import { Typography, Flex, Avatar, Menu } from "antd";
import { navMenuItems } from "../../helpers/NavMenuItems";
import axios from "axios";
import { AuthContextType } from "../../../../types";
import { BASE_URL } from "../../../../constants";

export const MyHeader = () => {
  const auth: AuthContextType = useAuth();
  const user = auth.user;
  const navigate = useNavigate();

  const onExit = () => {
    axios.post(`${BASE_URL}/logout`, "", { withCredentials: true }).then(() =>
      auth.logout(() => {
        navigate("signIn");
      })
    );
  };
  const onClickMenu = (e: { key: string }) => {
    const routes: { [key: string]: () => void } = {
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
      {user && (
        <Flex gap="small" align="center">
          <Avatar
            style={{ backgroundColor: "#87d068" }}
            icon={<UserOutlined />}
          />{" "}
          <Typography style={{ color: "#fff" }}>{user.name}</Typography>
        </Flex>
      )}
    </Header>
  );
};
