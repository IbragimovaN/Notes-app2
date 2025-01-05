import express from "express";
import {
  getNote,
  getNotes,
  addNote,
  editNote,
  deleteNote,
} from "../controllers/notes-controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router({ mergeParams: true });
router.use(authMiddleware);
router.get("/", async (req, res) => {
  try {
    const { notes, lastPage } = await getNotes(
      req.user.id,
      req.query.search,
      req.query.limit,
      req.query.page
    );
    res.send({ lastPage, notes });
  } catch (e) {
    res.send({ error: e.message || "Неизвестная ошибка" });
  }
});

router.get("/:id", async (req, res) => {
  console.log("get");
  try {
    const note = await getNote(req.params.id);

    res.send({ data: note });
  } catch (e) {
    res.send({ error: e.message || "Неизвестная ошибка" });
  }
});

router.post("/", async (req, res) => {
  console.log("post new", req.user.id, req.body.title);
  try {
    const newNote = await addNote(
      {
        title: req.body.title,
        text: req.body.text,
      },
      req.user.id
    );

    res.send({ data: newNote });
  } catch (e) {
    res.send({ error: e.message || "Неизвестная ошибка" });
  }
});

router.patch("/:id", async (req, res) => {
  console.log("editing");
  try {
    const updatedNote = await editNote(
      req.params.id,
      {
        title: req.body.title,
        text: req.body.text,
      },
      req.user.id
    );

    res.send({ data: updatedNote });
  } catch (e) {
    res.send({ error: e.message || "Неизвестная ошибка" });
  }
});

router.delete(
  "/:id",

  async (req, res) => {
    console.log("delete");
    await deleteNote(req.params.id, req.user.id);
    res.send({ error: null });
  }
);

export default router;
