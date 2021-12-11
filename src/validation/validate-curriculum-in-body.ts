import joi from "joi";
import { Curriculum } from "@prisma/client";
import createError from "http-errors";

const curriculumInBodySchema = joi.object({
  name: joi.string().required(),
  subjectId: joi.string().required(),
  instructorId: joi.string().required(),
  studentIds: joi.array().items(joi.string()).default([]),
  assignmentIds: joi.array().items(joi.string()).default([]),
});

export const validateCurriculumInBody = async (
  body: unknown
): Promise<
  Omit<Curriculum, "id"> & {
    assignmentIds: string[];
    studentIds: string[];
    instructorIds: string[];
  }
> => {
  try {
    const result = await curriculumInBodySchema.validateAsync(body);
    return result;
  } catch (error) {
    throw createError(400, (error as Error).message);
  }
};
