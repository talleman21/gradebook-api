import joi from "joi";
import { User } from "@prisma/client";
import createError from "http-errors";

const userInBodySchema = joi.object({
  firstName: joi.string().required(),
  lastName: joi.string().required(),
  userName: joi.string().required(),
  password: joi.string().required(),
  accountId: joi.string().required(),
});

export const validateUserInBody = async (
  body: unknown
): Promise<Omit<User, "id">> => {
  try {
    const result = await userInBodySchema.validateAsync(body);
    return result;
  } catch (error) {
    throw createError(400, (error as Error).message);
  }
};
