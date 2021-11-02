import joi from "joi";
import { Subject, Student, Curriculum } from "@prisma/client";
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
      })
    )
    .default([]),
  students: joi
    .array()
    .items(joi.object({ id: joi.string(), name: joi.string() }))
    .default([]),
});

export const validateSubjectInBody = async (
  body: unknown
): Promise<
  Omit<Subject, "id"> & { curriculums: Curriculum[]; students: Student[] }
> => {
  try {
    const result = await subjectInBodySchema.validateAsync(body);
    return result;
  } catch (error) {
    throw createError(400, (error as Error).message);
  }
};
