import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./utils/db.js";
import usersRouter from "./routes/usersRouter.js";
import postsRouter from "./routes/postsRouter.js";
import commentRoutes from "./routes/commentRoutes.js";
import { globalErrorHandler } from "./middleware/GlobalError.js";
import { fileURLToPath } from 'url'
import { dirname } from 'path'

dotenv.config();
connectDB();

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(cookieParser());
const __dirname = dirname(fileURLToPath(import.meta.url))
console.log(__dirname)

app.use(express.static(`${__dirname}/public/dist`))

app.use("/users", usersRouter);
app.use("/posts", postsRouter);
app.use("/comments", commentRoutes);

app.use("*",(req, res)=>{
  res.sendFile(`${__dirname}/public/dist/index.html`)
})

const PORT = process.env.PORT || 6000;

app.use(globalErrorHandler);
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
