import joi from "joi";
import { Subject, Curriculum } from "@prisma/client";
import createError from "http-errors";

const subjectInBodySchema = joi.object({
  id: joi.string(),
  name: joi.string().required(),
  curriculums: joi
    .array()
    .items(
      joi.object({
        id: joi.string(),
        name: joi.string(),
        subjectId: joi.string(),
        instructorId: joi.string(),
        students: joi.array(),
        assignments: joi.array(),
      })
    )
    .default([]),
});

export const validateSubjectInBody = async (
  body: unknown
): Promise<Omit<Subject, "id"> & { curriculums: Curriculum[] }> => {
  try {
    const result = await subjectInBodySchema.validateAsync(body);
    return result;
  } catch (error) {
    throw createError(400, (error as Error).message);
  }
};
