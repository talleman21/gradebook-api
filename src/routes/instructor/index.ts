import express from "express";
import { getOne } from "./get-one";
import { getMany } from "./get-many";
import { create } from "./create";
import { updateOne } from "./update";
import { deleteOne } from "./delete";

export const instructor = express.Router();

instructor.get("/", getMany);
instructor.get("/:id", getOne);
instructor.post("/", create);
instructor.put("/:id", updateOne);
instructor.delete("/:id", deleteOne);
