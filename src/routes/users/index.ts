import express from "express";
import { describe } from "./describe";
import { getOne } from "./get-one";
import { getMany } from "./get-many";
import { create } from "./create";
import { updateOne } from "./update";
import { deleteOne } from "./delete";

export const user = express.Router();

user.get("/describe", describe);
user.get("/", getMany);
user.get("/:id", getOne);
user.post("/", create);
user.put("/:id", updateOne);
user.delete("/:id", deleteOne);
