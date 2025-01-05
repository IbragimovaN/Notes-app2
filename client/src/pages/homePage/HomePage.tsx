import { ConfigProvider, Layout } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { Link, Outlet } from "react-router";
import { HomeOutlined } from "@ant-design/icons";

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
        },
      }}
    >
      {" "}
      <Layout style={{ minHeight: "100vh" }}>
        <Header>
          <Link to="/">
            <HomeOutlined />
            <span> Notes App</span>
          </Link>
        </Header>
        <Content style={{ position: "relative" }}>
          <Outlet />
        </Content>
        <Footer> by Ibragimova AA</Footer>
      </Layout>
    </ConfigProvider>
  );
};
