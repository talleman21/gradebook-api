import joi from "joi";
import { Assignment } from "@prisma/client";
import createError from "http-errors";

const assignmentInBodySchema = joi.object({
  name: joi.string().required(),
  description: joi.string().required(),
  dueDate: joi.date().default(new Date()).required(),
  curriculumId: joi.string().required(),
  gradeIds: joi.array().items(joi.string()).default([]),
});

export const validateAssignmentInBody = async (
  body: unknown
): Promise<Omit<Assignment, "id">> => {
  try {
    const result = await assignmentInBodySchema.validateAsync(body);
    return result;
  } catch (error) {
    throw createError(400, (error as Error).message);
  }
};
