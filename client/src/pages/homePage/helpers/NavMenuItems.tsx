import {
  HomeOutlined,
  UserOutlined,
  LogoutOutlined,
  FileTextOutlined,
  LoginOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { useAuth } from "../../../context/AuthProvider";
type MenuItem = Required<MenuProps>["items"][number];

const subMenuAccount = {
  isAuth: [
    {
      key: "exit",
      label: "Exit",
      icon: <LogoutOutlined />,
    },
  ],
  notAuth: [
    {
      key: "signup",
      label: "Sign Up",
      icon: <UserAddOutlined />,
    },
    {
      key: "signin",
      label: "Sign In",
      icon: <LoginOutlined />,
    },
  ],
};
export const navMenuItems = (user) => {
  return [
    {
      key: "home",
      label: "Home",
      icon: <HomeOutlined />,
    },
    {
      key: "about",
      label: "About",
      icon: <FileTextOutlined />,
    },
    {
      key: "account",
      label: "Account",
      icon: <UserOutlined />,
      children: user ? subMenuAccount.isAuth : subMenuAccount.notAuth,
    },
  ];
};
