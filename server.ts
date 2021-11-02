import {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
} from "@prisma/client/runtime";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
const app = express();
const PORT = process.env.PORT;
import {
  student,
  subject,
  curriculum,
  assignment,
  instructor,
  grade,
} from "./src/routes";

app.use(express.json());
app.use(
  cors({
    allowedHeaders: ["X-Total-Count", "range", "content-type"],
    exposedHeaders: ["Content-Range"],
  })
);

app.use((req, res, next) => {
  console.log(req.body);
  res.header("X-Total-Count", "10");
  res.header("Content-Range", "0-10/10");
  next();
});

app.use("/instructor", instructor);
app.use("/student", student);
app.use("/subject", subject);
app.use("/curriculum", curriculum);
app.use("/assignment", assignment);
app.use("/grade", grade);

// error handler
app.use(function (
  err: (Error & { status: number }) | any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(err.message);
  if (
    err instanceof PrismaClientKnownRequestError ||
    err instanceof PrismaClientUnknownRequestError
  ) {
    //@ts-ignore
    console.log(err.code);
  }

  // render the error page
  res.status(err.status || 500);
  res.send(err.message);
});

app.listen(process.env.PORT, () => {
  console.log(`app started on ${PORT}`);
});
