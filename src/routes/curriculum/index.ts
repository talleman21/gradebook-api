import express from "express";
import { getOne } from "./get-one";
import { getMany } from "./get-many";
import { create } from "./create";
import { updateOne } from "./update";
import { deleteOne } from "./delete";

export const curriculum = express.Router();

curriculum.get("/", getMany);
curriculum.get("/:id", getOne);
curriculum.post("/", create);
curriculum.put("/:id", updateOne);
curriculum.delete("/:id", deleteOne);
