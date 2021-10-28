import express from "express";
import { getOne } from "./get-one";
import { getMany } from "./get-many";
import { create } from "./create";
import { updateOne } from "./update-one";
import { deleteOne } from "./delete-one";

export const instructor = express.Router();

instructor.get("/", (req, res) => getMany(req, res));
instructor.get("/:id", (req, res) => getOne(req, res));
instructor.post("/", (req, res) => create(req, res));
instructor.put("/:id", (req, res) => updateOne(req, res));
instructor.delete("/:id", (req, res) => deleteOne(req, res));
