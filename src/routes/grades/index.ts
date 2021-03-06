import express from "express";
import { describe } from "./describe";
import { getOne } from "./get-one";
import { getMany } from "./get-many";
import { create } from "./create";
import { updateOne } from "./update";
import { deleteOne } from "./delete";

export const grade = express.Router();

grade.get("/describe", describe);
grade.get("/", getMany);
grade.get("/:id", getOne);
grade.post("/", create);
grade.put("/:id", updateOne);
grade.delete("/:id", deleteOne);
