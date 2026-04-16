import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import passport from "./auth/passport.js";
import router from "./routes/index.js";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? "https://kanban-board-drab-chi.vercel.app"
        : "http://localhost:5173",
    credentials: true,
  }),
);
app.use(passport.initialize());
app.use(router);
const PORT = process.env.PORT || 5000;

app.get("/api/health", (request, response) => {
  return response.status(200).send({ status: "healthy" });
});

// Only listen locally
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => console.log(`Server listeniing on port ${PORT}`));
}

// Export the app for Vercel's serverless environment
export default app;
