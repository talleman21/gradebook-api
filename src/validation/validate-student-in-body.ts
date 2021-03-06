import joi from "joi";
import { Student } from "@prisma/client";
import createError from "http-errors";

const studentInBodySchema = joi.object({
  userId: joi.string().required(),
  curriculumIds: joi.array().items(joi.string()).default([]),
});

export const validateStudentInBody = async (
  body: unknown
): Promise<
  Omit<Student, "id"> & { instructorIds: string[]; curriculumIds: string[] }
> => {
  try {
    const result = await studentInBodySchema.validateAsync(body);
    return result;
  } catch (error) {
    throw createError(400, (error as Error).message);
  }
};
