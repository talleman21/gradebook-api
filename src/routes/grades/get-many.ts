import { NextFunction, Request, Response } from "express";
import { prisma } from "../../shared";
import {
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
    const { field, sortOrder } = await validateSortInQuery(req.query);
    const [count, grades] = await prisma.$transaction([
      prisma.grade.count(),
      prisma.grade.findMany({
        skip,
        take,
        orderBy: { [field]: sortOrder },
        where: { assignmentId: req.query.assignmentId as string },
      }),
    ]);

    res.header("X-Total-Count", count.toString());
    res.send(grades);
  } catch (error) {
    next(error);
  }
};
