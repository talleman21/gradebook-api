import joi, { StringSchema } from "joi";

export const validateFilterInQuery = async <T>(
  query: unknown,
  filterFields: T
): Promise<{ [index: string]: { contains: string; mode: string } }[]> => {
  const filterObject: { [index: string]: StringSchema } = {};
  Object.keys(filterFields).forEach(
    (field) => (filterObject[field] = joi.string())
  );

  const filterInQuerySchema = joi.object(filterObject);

  const result = await filterInQuerySchema.validateAsync(query, {
    stripUnknown: true,
  });

  return Object.entries(result).map(([key, value]) => ({
    [key]: {
      contains: value as string,
      mode: "insensitive",
    },
  }));
};
