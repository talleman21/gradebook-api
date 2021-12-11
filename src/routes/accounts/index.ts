import express from "express";
import { describe } from "./describe";
import { getOne } from "./get-one";
import { getMany } from "./get-many";
import { create } from "./create";
import { updateOne } from "./update";
import { deleteOne } from "./delete";

export const account = express.Router();

account.get("/describe", describe);
account.get("/", getMany);
account.get("/:id", getOne);
account.post("/", create);
account.put("/:id", updateOne);
account.delete("/:id", deleteOne);
