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
app.use(cors());
//entrypoint
app.get("/", (req: express.Request, res: express.Response) => {
   res.send("Papoy");
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
