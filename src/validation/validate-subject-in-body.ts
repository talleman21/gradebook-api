import joi from "joi";
import { Subject } from "@prisma/client";
import createError from "http-errors";

const subjectInBodySchema = joi.object({
  id: joi.string(),
  name: joi.string().required(),
});

export const validateSubjectInBody = async (
  body: unknown
): Promise<Omit<Subject, "id">> => {
  try {
    const result = await subjectInBodySchema.validateAsync(body);
    return result;
  } catch (error) {
    throw createError(400, (error as Error).message);
  }
};
