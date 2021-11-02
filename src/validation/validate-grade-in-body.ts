import joi from "joi";
import { Grade } from "@prisma/client";
import createError from "http-errors";

const gradeInBodySchema = joi.object({
  grade: joi.number().default(0).required(),
  studentId: joi.string().required(),
  assignmentId: joi.string().required(),
});

export const validateGradeInBody = async (
  body: unknown
): Promise<Omit<Grade, "id">> => {
  try {
    const result = await gradeInBodySchema.validateAsync(body);
    return result;
  } catch (error) {
    throw createError(400, (error as Error).message);
  }
};
