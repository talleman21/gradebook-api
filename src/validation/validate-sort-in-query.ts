import joi from "joi";
import createError from "http-errors";
import { Prisma } from "@prisma/client";

const sortInQuerySchema = joi
  .object({
    _sort: joi.string(),
    _order: joi.string().valid("ASC", "DESC", "asc", "desc"),
  })
  .unknown()
  .required();

export const validateSortInQuery = async (
  query: unknown
): Promise<{ [index: string]: Prisma.SortOrder } | undefined> => {
  try {
    const result = await sortInQuerySchema.validateAsync(query);
    if (result._sort && result._order) {
      return { [result._sort]: result._order.toLowerCase() };
    }
    return;
  } catch (error) {
    throw createError(400, (error as Error).message);
  }
};
