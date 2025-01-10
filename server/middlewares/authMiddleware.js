import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token; // Предполагается, что токен хранится в cookie
  if (!token) return res.status(401).send({ error: "Не авторизован" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Добавляем информацию о пользователе в запрос
    next();
  } catch (error) {
    return res.status(401).send({ error: "Не авторизован" });
  }
};

export default authMiddleware;
