import joi from "joi";
import { Student } from "@prisma/client";
import createError from "http-errors";

const studentInBodySchema = joi.object({
  name: joi.string().required(),
  instructorIds: joi.array().items(joi.string()).default([]),
  subjectIds: joi.array().items(joi.string()).default([]),
});

export const validateStudentInBody = async (
  body: Omit<Student, "id">
): Promise<
  Omit<Student, "id"> & { instructorIds: string[]; subjectIds: string[] }
> => {
  try {
    const result = await studentInBodySchema.validateAsync(body);
    return result;
  } catch (error) {
    throw createError(400, (error as Error).message);
  }
};
