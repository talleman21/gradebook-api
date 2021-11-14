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
): Promise<{ field: string; sortOrder: Prisma.SortOrder }> => {
  try {
    const result = await sortInQuerySchema.validateAsync(query);
    return {
      field: result._sort,
      sortOrder: result._sort ? result._order.toLowerCase() : undefined,
    };
  } catch (error) {
    throw createError(400, (error as Error).message);
  }
};
