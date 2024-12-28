import { Content } from "antd/es/layout/layout";
import axios from "axios";
import { useEffect } from "react";

export const WorkspacePage = () => {
  useEffect(() => {
    //reg работает
    // axios
    //   .post("http://localhost:3003/register", {
    //     name: "ffff",
    //     email: "aa@.ru",
    //     password: "1234",
    //   })
    //   .then((data) => console.log(data.data));

    //login
    axios
      .post("/api/login", {
        email: "aa@.ru",
        password: "1234",
      })
      .then((data) => console.log(data.data));

    // fetch("/login", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json;charset=utf-8" },
    //   body: JSON.stringify({
    //     email: "aa@.ru",
    //     password: "1234",
    //   }),
    // });
  }, []);

  return <Content>workspacePage</Content>;
};
