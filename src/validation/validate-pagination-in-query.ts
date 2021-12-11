import joi from "joi";
import createError from "http-errors";

const paginationInQuerySchema = joi
  .object({
    _start: joi.number().integer().min(0).default(0),
    _end: joi.number().integer().positive().default(10),
  })
  .unknown()
  .required();

export const validatePaginationInQuery = async (
  query: unknown
): Promise<{ skip: number; take: number }> => {
  try {
    const result = await paginationInQuerySchema.validateAsync(query);
    return { skip: result._start, take: result._end - result._start };
  } catch (error) {
    throw createError(400, (error as Error).message);
  }
};
