import { ConfigProvider, Layout } from "antd";
import { Content, Footer } from "antd/es/layout/layout";
import { Outlet } from "react-router";
import { GithubOutlined } from "@ant-design/icons";
import { MyHeader } from "./components";

export const HomePage = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#722ed1",
          colorBgTextHover: "#f9f0ff",
          colorLinkHover: "#722ed1",
          fontSize: 16,
        },
        components: {
          Layout: {
            headerBg: "#120338",
            footerBg: "#f9f0ff",
            headerColor: "#fff",
          },
          Menu: {
            darkItemBg: "#120338",
            darkPopupBg: "#120338",
          },
          Button: {
            textTextColor: "#120338",
            textHoverBg: "#f9f0ff",
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
          <a style={{ color: "#6d6767" }} href="https://github.com/IbragimovaN">
            {" "}
            Ibragimova AA <GithubOutlined />
          </a>
        </Footer>
      </Layout>
    </ConfigProvider>
  );
};
