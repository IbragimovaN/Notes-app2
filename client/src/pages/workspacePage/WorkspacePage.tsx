import { Content } from "antd/es/layout/layout";
import axios from "axios";
import { useEffect } from "react";

export const WorkspacePage = () => {
  useEffect(() => {
    //reg работает
    // axios
    //   .post("/api/register", {
    //     name: "ffff",
    //     email: "aa@.ru",
    //     password: "1234",
    //   })
    //   .then((data) => console.log(data.data));
    //login
    // axios
    //   .post("/api/login", {
    //     email: "aa@.ru",
    //     password: "1234",
    //   })
    //   .then((data) => console.log(data.data));
    //logout
    // axios.post("/api/logout", {
    //   email: "aa@.ru",
    //   password: "1234",
    // });
    //note create
    // axios
    //   .post("/api/notes", {
    //     title: "2222",
    //     text: "texttttttt2",
    //
    //   })
    //   .then((data) => console.log(data.data));
    //notes get all
    // axios.get("/api/notes").then((data) => console.log(data.data));
    //note get one
    // axios
    //   .get("/api/notes/677013d3374ed9a8a13a930d")
    //   .then((data) => console.log(data.data));
    //nore delete
    // axios
    //   .delete("/api/notes/677013d3374ed9a8a13a930d")
    //   .then((data) => console.log(data.data));
    //note editing
    // axios
    //   .patch("/api/notes/677013f5374ed9a8a13a930f", {
    //     title: "is new title!",
    //     text: "texttttttt333",
    //   })
    //   .then((data) => console.log(data.data));
  }, []);

  return <Content>workspacePage</Content>;
};
