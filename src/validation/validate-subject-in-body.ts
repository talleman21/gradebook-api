import joi from "joi";
import { Subject } from "@prisma/client";
import createError from "http-errors";

const subjectInBodySchema = joi.object({
  name: joi.string().required(),
  curriculumIds: joi.array().items(joi.string()).required().default([]),
  studentIds: joi.array().items(joi.string()).required().default([]),
});

export const validateSubjectInBody = async (
  body: unknown
): Promise<
  Omit<Subject, "id"> & { curriculumIds: string[]; studentIds: string[] }
> => {
  try {
    const result = await subjectInBodySchema.validateAsync(body);
    return result;
  } catch (error) {
    throw createError(400, (error as Error).message);
  }
};
