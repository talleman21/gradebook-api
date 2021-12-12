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
  account,
  user,
} from "./src/routes";

app.use(express.json());
app.use(
  cors({
    allowedHeaders: ["Content-Type"],
    exposedHeaders: ["X-Total-Count"],
  })
);

app.use("/", (req, res, next) => {
  console.log("req", req.body);
  console.log("query", req.query);
  console.log(process.env.test_var);
  next();
});

app.use("/accounts", account);
app.use("/users", user);
app.use("/instructors", instructor);
app.use("/students", student);
app.use("/subjects", subject);
app.use("/curriculums", curriculum);
app.use("/assignments", assignment);
app.use("/grades", grade);

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
