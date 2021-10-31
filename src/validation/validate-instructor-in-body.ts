import joi from "joi";
import { Instructor } from "@prisma/client";
import createError from "http-errors";

const instructorInBodySchema = joi.object({
  name: joi.string().required(),
  studentIds: joi.array().items(joi.string()).default([]),
});

export const validateInstructorInBody = async (
  body: unknown
): Promise<Omit<Instructor, "id"> & { studentIds: string[] }> => {
  try {
    const result = await instructorInBodySchema.validateAsync(body);
    return result;
  } catch (error) {
    throw createError(400, (error as Error).message);
  }
};
