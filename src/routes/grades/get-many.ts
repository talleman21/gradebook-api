import { NextFunction, Request, Response } from "express";
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
    const { skip, take } = await validatePaginationInQuery(req.query);
    const orderBy = await validateSortInQuery(req.query);
    const filters = await validateFilterInQuery(req.query, [
      "assignmentId",
      "studentId",
    ]);

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
