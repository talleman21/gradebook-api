import joi from "joi";
import createError from "http-errors";
import { Prisma } from "@prisma/client";

const sortInQuerySchema = <T>(validFields: T) => {
  return joi
    .object({
      _sort: joi.string().valid(...Object.values(validFields)),
      _order: joi.string().lowercase().valid("asc", "desc"),
    })
    .unknown()
    .required();
};

export const validateSortInQuery = async <T>(
  query: unknown,
  validFields: T
): Promise<{ [index: string]: Prisma.SortOrder } | undefined> => {
  try {
    const schema = sortInQuerySchema<T>(validFields);
    const result = await schema.validateAsync(query);
    if (result._sort && result._order) {
      return { [result._sort]: result._order };
    }
    return;
  } catch (error) {
    throw createError(400, (error as Error).message);
  }
};
