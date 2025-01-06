import { Flex } from "antd";
import Card from "antd/es/card/Card";

export const NotFoundPage = () => {
  console.log("not found page");
  return (
    <>
      <Card>
        <Flex align="center" justify="center">
          Page Not Found
        </Flex>
      </Card>
    </>
  );
};
