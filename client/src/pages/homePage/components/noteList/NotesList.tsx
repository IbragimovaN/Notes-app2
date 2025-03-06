import { Button, Input, Modal, Flex, Pagination, Card } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { CreateNoteField } from "../../../../components/createNoteField/CreateNoteField";
import { PAGINATION_LIMIT } from "../../../../constants";
import { PlusOutlined } from "@ant-design/icons";
import { Note } from "../../../../types";
import { Spin } from "antd";
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
  const [loading, setLoading] = useState<boolean>(false);

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
    });
    setIsModalOpen(false);
  };

  useEffect(() => {
    setLoading(true);
    getAllNotesFromIndexedDB(searchPhrase, page, PAGINATION_LIMIT).then(
      (data) => {
        setLoading(false);
        setNotes(data.notes);
        setLastPage(data.lastPage);
        setNote({ title: "", text: "" });
      }
    );
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
        {loading ? (
          <Spin />
        ) : (
          <>
            {" "}
            {notes &&
              notes.map((note) => (
                <Link to={`/${note._id}`} key={note._id}>
                  {" "}
                  <Card title={note.title}>{note.text}</Card>
                </Link>
              ))}
            <Flex justify="center" gap="large">
              {" "}
              <Pagination
                current={page}
                total={lastPage * PAGINATION_LIMIT}
                pageSize={PAGINATION_LIMIT}
                onChange={(pageNumber) => setPage(pageNumber)}
              />
            </Flex>
          </>
        )}
      </Flex>
    </>
  );
};
