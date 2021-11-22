import joi from "joi";
import { Account } from "@prisma/client";
import createError from "http-errors";

const accountInBodySchema = joi.object({
  name: joi.string().required(),
  adminId: joi.string().required(),
});

export const validateAccountInBody = async (
  body: unknown
): Promise<Omit<Account, "id">> => {
  try {
    const result = await accountInBodySchema.validateAsync(body);
    return result;
  } catch (error) {
    throw createError(400, (error as Error).message);
  }
};
