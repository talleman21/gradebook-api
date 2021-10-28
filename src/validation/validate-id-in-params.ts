import joi from "joi";
import createError from "http-errors";

const idInParamsSchema = joi
  .object({
    id: joi.string().required(),
  })
  .unknown()
  .required();

export const validateIdInParams = async (params: unknown): Promise<string> => {
  try {
    const result = await idInParamsSchema.validateAsync(params);
    return result.id;
  } catch (error) {
    throw createError(400, (error as Error).message);
  }
};
