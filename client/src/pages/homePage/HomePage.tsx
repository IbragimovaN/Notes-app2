import { ConfigProvider, Layout } from "antd";
import { Content, Footer } from "antd/es/layout/layout";
import { Link, Outlet } from "react-router";
import { GithubOutlined } from "@ant-design/icons";
import { MyHeader } from "./components/header/MyHeader.jsx";

export const HomePage = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#722ed1",
        },
        components: {
          Layout: {
            headerBg: "#120338",
            footerBg: "#f9f0ff",
            headerColor: "#fff",
          },
          Menu: {
            darkItemBg: "#120338",
          },
        },
      }}
    >
      {" "}
      <Layout style={{ minHeight: "100vh" }}>
        <MyHeader />
        <Content style={{ position: "relative", padding: "20px 48px" }}>
          <Outlet />
        </Content>
        <Footer>
          {" "}
          by Ibragimova AA <GithubOutlined />
        </Footer>
      </Layout>
    </ConfigProvider>
  );
};
