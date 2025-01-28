import { Button, Input, Modal, Flex, Pagination, Card } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import { CreateNoteField } from "../../../../components/createNoteField/CreateNoteField";
import { BASE_URL, PAGINATION_LIMIT } from "../../../../constants";
import { PlusOutlined } from "@ant-design/icons";
import { useAuth } from "../../../../context/AuthProvider";
import { ErrorServer } from "../../../../components/errorServer/ErrorServer";
import { AuthContextType, Note } from "../../../../types";
import {
  createNoteToIndexedDB,
  getAllNotesFromIndexedDB,
} from "../../../../indexedDB/api_indexedDB";

export const NotesList = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [note, setNote] = useState<Note>({ title: "", text: "" });
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [lastPage, setLastPage] = useState<number>(1);
  const [searchPhrase, setSearchPhrase] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const auth: AuthContextType = useAuth();
  const user = auth.user;

  const { Search } = Input;

  const onSearch = (searchValue: string) => {
    setSearchPhrase(searchValue);
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      setSearchPhrase("");
    }
  };

  const handleOk = () => {
    createNoteToIndexedDB({
      title: note.title,
      text: note.text,
      _id: Date.now().toString(),
    }).then((data) => {
      setNote(data);
      setNotes([data, ...notes]);
      setErrorMessage(null);
    });
    setIsModalOpen(false);

    //старый код
    // axios
    //   .post(
    //     `${BASE_URL}/notes`,
    //     {
    //       title: note.title,
    //       text: note.text,
    //     },
    //     { withCredentials: true }
    //   )
    //   .then((data) => {
    //     if (data.data.error) {
    //       setErrorMessage(data.data.error);
    //     } else {
    //       setNotes([data.data.data, ...notes]);
    //       setNote({ title: "", text: "" });
    //       setErrorMessage(null);
    //     }
    //   });
    // setIsModalOpen(false);
  };

  useEffect(() => {
    user &&
      getAllNotesFromIndexedDB(searchPhrase, page, PAGINATION_LIMIT).then(
        (data) => {
          console.log(data);
          setNotes(data);
          setNote({ title: "", text: "" });
          setErrorMessage(null);
        }
      );
    //старый код
    // axios
    //   .get(
    //     `${BASE_URL}/notes?search=${searchPhrase}&page=${page}&limit=${PAGINATION_LIMIT}`,
    //     { withCredentials: true }
    //   )
    //   .then((data) => {
    //     if (data.data.error) {
    //       setErrorMessage(data.data.error);
    //     } else {
    //       setNotes(data.data.notes);
    //       setLastPage(data.data.lastPage);
    //       setErrorMessage(null);
    //     }
    //   });
  }, [searchPhrase, page]);

  return (
    <>
      {user ? (
        <>
          {" "}
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
            {errorMessage && <ErrorServer errorMessage={errorMessage} />}
            {notes &&
              notes.map((note) => (
                <Link to={`/${note._id}`} key={note._id}>
                  {" "}
                  <Card title={note.title}>{note.text}</Card>
                </Link>
              ))}

            {!errorMessage && (
              <Flex justify="center" gap="large">
                {" "}
                <Pagination
                  current={page}
                  total={lastPage * PAGINATION_LIMIT}
                  pageSize={PAGINATION_LIMIT}
                  onChange={(pageNumber) => setPage(pageNumber)}
                />
              </Flex>
            )}
          </Flex>{" "}
        </>
      ) : (
        <p>Войдите или зарегестрируйтесь</p>
      )}
    </>
  );
};
