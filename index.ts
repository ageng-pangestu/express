import express from "express";
import dotenv from "dotenv";
import route from "./src/routes";
import db from "./src/libs/db";
import cors from "cors";

//inisialisasi dotenv
dotenv.config();

//inisialisasi express
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("src/uploads"));
app.use(cors());

//entrypoint
app.get("/posts", async (req, res) => {
  const posts = await db.user.findMany({
    orderBy: {
      id: "desc",
    },
  });

  res.send(posts[0].fullName);
});
app.use(route);

//run server
app.listen(port, async () => {
  try {
    await db.$connect;
    console.log(`[server]: Server is running at http://localhost:${port}`);
  } catch (error) {
    await db.$disconnect;
  }
});
