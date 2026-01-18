import bcrypt from "bcrypt";
import prisma from "../db/prisma.js";
import { Router } from "express";
import jwt from "jsonwebtoken";
import requireAuth from "../auth/requireAuth.js";

const router = Router();

router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ error: "Email and password are required" });

  const exists = (await prisma.user.findUnique({ where: { email } }))
    ? true
    : false;
  if (exists) return res.status(409).json({ error: "User already exists" });

  const hash = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: hash,
    },
  });

  return res.status(201).json({ id: user.id, email });
});

router.post("/login", async (req, res) => {
  const {
    body: { email, password },
  } = req;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ error: "Invalid credentials" });
  const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.cookie("access_token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    maxAge: 60 * 60 * 1000,
  });
  return res.status(200).json({ message: "login successful" });
});

router.post("/logout", requireAuth, (req, res) => {
  res.clearCookie("access_token");
  return res.status(200).json({ success: true });
});

router.get("/protected", requireAuth, (req, res) => {
  res.json({
    id: req.user.id,
    email: req.user.email,
  });
});

export default router;
