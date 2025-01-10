import express from "express";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import router from "./routes/index.js";
import cors from "cors";

const port = 3003;
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // Разрешить отправку куки
  })
);
app.use(express.static("../client/dist"));
app.use(cookieParser());
app.use(express.json());

app.use("/", router);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve("./", "dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve("../client/dist", "index.html"));
  });
}

mongoose.connect(process.env.MONGODB_CONNECTION_STRING).then(() => {
  app.listen(port, async () => {
    console.log(`server started on port ${port}`);
  });
});
