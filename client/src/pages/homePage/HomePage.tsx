import { ConfigProvider, Layout } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { Outlet } from "react-router";
import { WorkspacePage } from "../workspacePage/workspacePage";

export const HomePage = () => {
  console.log(new Date().toISOString());
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
      <Layout>
        <Header>notes app</Header>
        <Content>
          {/* <Outlet /> */}
          <WorkspacePage />
        </Content>
        <Footer> by Ibragimova AA</Footer>
      </Layout>
    </ConfigProvider>
  );
};
