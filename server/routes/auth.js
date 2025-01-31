import express from "express";
import { register, login } from "../controllers/user-controller.js";

const router = express.Router({ mergeParams: true });

router.post("/register", async (req, res) => {
  try {
    const { user, token } = await register(
      req.body.email,
      req.body.name,
      req.body.password
    );
    res.send({ error: null, user });
  } catch (e) {
    res.send({ error: e.message || "Неизвестная ошибка" });
  }
});
router.post("/login", async (req, res) => {
  console.log("login");
  try {
    const { user, token } = await login(req.body.email, req.body.password);
    res.cookie("token", token, { httpOnly: true }).send({ error: null, user });
  } catch (e) {
    res.send({ error: e.message || "Неизвестная ошибка" });
  }
});

router.post("/logout", (req, res) => {
  res.cookie("token", "", { httpOnly: true }).send({});
});

export default router;
