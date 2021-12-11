import express from "express";
import { describe } from "./describe";
import { getOne } from "./get-one";
import { getMany } from "./get-many";
import { create } from "./create";
import { updateOne } from "./update";
import { deleteOne } from "./delete";

export const assignment = express.Router();

assignment.get("/describe", describe);
assignment.get("/", getMany);
assignment.get("/:id", getOne);
assignment.post("/", create);
assignment.put("/:id", updateOne);
assignment.delete("/:id", deleteOne);
