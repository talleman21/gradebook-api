import joi from "joi";

const idInParamsSchema = joi
  .object({
    id: joi.string().required(),
  })
  .unknown()
  .required();

export const validateIdInParams = async (params: unknown): Promise<string> => {
  const result = await idInParamsSchema.validateAsync(params);
  return result.id;
};
