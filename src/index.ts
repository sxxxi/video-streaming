import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const app: Express = express();
const port: string | undefined = process.env.PORT;

if (port == undefined) {
  console.log("Port not specified in the environment.");
  process.exit(1);
}

app.get("/", (req: Request, res: Response) => {
  res.send('Hello from Express!');
});

app.get("/video", (req: Request, res: Response) => {
  const path = "res/videos/chipi.mp4";
  fs.stat(path, (err, stats) => {
    if (err) {
      console.error(err.message);
      res.send("Fuck");
    }

    res.writeHead(200, {
      "Content-Type": "video/mp4",
      "Lontent-Length": stats.size,
    });

    fs.createReadStream(path).pipe(res);
  }) 
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});