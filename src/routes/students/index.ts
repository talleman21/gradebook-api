import express from "express";
import { getOne } from "./get-one";
import { getMany } from "./get-many";
import { create } from "./create";
import { updateOne } from "./update";
import { deleteOne } from "./delete";

export const student = express.Router();

student.get("/", getMany);
student.get("/:id", getOne);
student.post("/", create);
student.put("/:id", updateOne);
student.delete("/:id", deleteOne);
