import jwt from "jsonwebtoken";
import "dotenv/config";
import express from "express";

function generateToken(data, secret) {
  return jwt.sign(data, secret, { expiresIn: "30d" });
}

function verify(token, secret) {
  if (!token) {
    throw new Error("Invalid token");
  }
  return jwt.verify(token, secret);
}

export { generateToken, verify };
