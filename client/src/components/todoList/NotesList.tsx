import { Button, List, Input, Modal, Flex, Pagination, Grid } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, Navigate } from "react-router";
import { CreateNoteField } from "../createNoteField/CreateNoteField";
import { PAGINATION_LIMIT } from "../../constants";
import { PlusOutlined } from "@ant-design/icons";
import { useAuth } from "../../context/authProvider";
import { SignInPage } from "../../pages";

export const NotesList = () => {
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState({ title: "", text: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [searchPhrase, setSearchPhrase] = useState("");

  const auth = useAuth();

  if (auth.user === null) {
    return <Navigate to="/signIn" />;
  }
  const { Search } = Input;

  const onSearch = (searchValue) => {
    setSearchPhrase(searchValue);
  };
  const onChange = (e) => {
    if (e.target.value === "") {
      setSearchPhrase("");
    }
  };
  console.log(page);
  const handleOk = () => {
    axios
      .post("/api/notes", {
        title: note.title,
        text: note.text,
      })
      .then((data) => {
        console.log(data);
        setNotes([data.data.data, ...notes]);
      });
    setIsModalOpen(false);
  };

  useEffect(() => {
    axios
      .get(
        `/api/notes?search=${searchPhrase}&page=${page}&limit=${PAGINATION_LIMIT}`
      )
      .then((data) => {
        console.log(data);
        setNotes(data.data.notes);
        setLastPage(data.data.lastPage);
      });
  }, [searchPhrase, page]);

  return (
    <>
      <Flex justify="center" gap="large" style={{ marginBottom: "50px" }}>
        {" "}
        <Button
          shape="circle"
          icon={<PlusOutlined />}
          onClick={() => setIsModalOpen(true)}
        />
        <Search
          placeholder="input search text"
          onSearch={onSearch}
          enterButton
          style={{ maxWidth: "300px" }}
          allowClear
          onChange={onChange}
        />
      </Flex>
      <Modal
        title="Новая заметка"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
      >
        <CreateNoteField note={note} setNote={setNote} />
      </Modal>
      <Flex vertical justify="space-betwiin" gap="large">
        <List
          dataSource={notes}
          renderItem={(note) => (
            <List.Item>
              <Link to={`/${note._id}`}> {note.title}</Link>
            </List.Item>
          )}
        />
        <Flex justify="center" gap="large">
          {" "}
          <Pagination
            current={page}
            total={lastPage * PAGINATION_LIMIT}
            pageSize={PAGINATION_LIMIT}
            onChange={(pageNumber) => setPage(pageNumber)}
          />
        </Flex>
      </Flex>
    </>
  );
};
