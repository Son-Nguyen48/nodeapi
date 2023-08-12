import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";
import router from "./router";

const app = express();

app.use(
  cors({
    credentials: true
  })
);

app.use(compression());
app.use(cookieParser());
app.use(
  express.urlencoded({
    extended: true
  })
);
app.use(express.json());

// app.use(express.json());
// app.use(express.urlencoded());

const server = http.createServer(app);
const port = 8080;

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

const MONGO_URL =
  "mongodb+srv://thesonptithp:4fzDTDWCrBFV40Rj@cluster0.nbncc1p.mongodb.net/Blog_dev?retryWrites=true&w=majority";

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on("error", (error: Error) => console.log(error));

app.use("/", router());
