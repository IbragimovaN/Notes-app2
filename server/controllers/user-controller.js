import bcrypt from "bcrypt";
import User from "../models/user-model.js";
import { generateToken } from "../halpers/generateToken.js";

async function register(email, name, password) {
  if (!password) {
    throw new Error("Заполните пароль");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("Пользователь с таким email уже существует");
  }

  const passwordHash = await bcrypt.hash(password, 10);
  let user = await User.create({
    email: email,
    password: passwordHash,
    name: name,
  });

  const token = generateToken({ id: user.id }, process.env.JWT_SECRET);
  return { user, token };
}

async function login(email, password) {
  let user = await User.findOne({ email: email });

  if (!user) {
    throw new Error("Пользователь не найден");
  }
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    throw new Error("Не верный пароль");
  }
  const token = generateToken({ id: user.id }, process.env.JWT_SECRET);
  return { user, token };
}

export { register, login };
