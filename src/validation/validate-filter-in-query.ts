import joi, { AlternativesSchema } from "joi";

export const validateFilterInQuery = async <T>(
  query: unknown,
  filterFields: T
): Promise<{ [index: string]: { in: string[]; mode: string } }[]> => {
  const filterObject: { [index: string]: AlternativesSchema } = {};

  // dynamically create schema. handles string or string[]
  Object.keys(filterFields).forEach((field) => {
    return (filterObject[field] = joi
      .alternatives()
      .try(joi.string(), joi.array().items(joi.string())));
  });

  const filterInQuerySchema = joi.object(filterObject);

  // validate schema
  const result: { [index: string]: string | string[] } =
    await filterInQuerySchema.validateAsync(query, {
      stripUnknown: true,
    });

  return Object.entries(result).map(([key, value]) => ({
    [key]: {
      in: Array.isArray(value) ? (value as string[]) : [value as string],
      mode: "insensitive",
    },
  }));
};
