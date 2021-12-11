import { NextFunction, Request, Response } from "express";
import { Prisma } from "@prisma/client";
import { prisma } from "../../shared";
import {
  validateFilterInQuery,
  validatePaginationInQuery,
  validateSortInQuery,
} from "../../validation";

export const getMany = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const modelEnum = Prisma.GradeScalarFieldEnum;
    const { skip, take } = await validatePaginationInQuery(req.query);
    const orderBy = await validateSortInQuery<typeof modelEnum>(
      req.query,
      modelEnum
    );
    const filters = await validateFilterInQuery<typeof modelEnum>(
      req.query,
      modelEnum
    );

    console.log("filters", filters);

    const [count, grades] = await prisma.$transaction([
      prisma.grade.count(),
      prisma.grade.findMany({
        skip,
        take,
        where: { AND: filters },
        orderBy,
      }),
    ]);

    res.header("X-Total-Count", count.toString());
    res.send(grades);
  } catch (error) {
    next(error);
  }
};
