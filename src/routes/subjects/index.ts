import express from "express";
import { describe } from "./describe";
import { getOne } from "./get-one";
import { getMany } from "./get-many";
import { create } from "./create";
import { updateOne } from "./update";
import { deleteOne } from "./delete";

export const subject = express.Router();

subject.get("/describe", describe);
subject.get("/", getMany);
subject.get("/:id", getOne);
subject.post("/", create);
subject.put("/:id", updateOne);
subject.delete("/:id", deleteOne);
