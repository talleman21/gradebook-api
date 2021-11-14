import { NextFunction, Request, Response } from "express";
import { prisma } from "../../shared";
import { getCurriculumDTO } from "../../formatters";
import {
  validatePaginationInQuery,
  validateSortInQuery,
} from "../../validation";

export const getMany = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { skip, take } = await validatePaginationInQuery(req.query);
    const { field, sortOrder } = await validateSortInQuery(req.query);
    const [count, curriculums] = await prisma.$transaction([
      prisma.curriculum.count(),
      prisma.curriculum.findMany({
        skip,
        take,
        orderBy: { [field]: sortOrder },
        include: {
          subject: true,
          instructor: true,
          students: true,
          assignments: true,
        },
      }),
    ]);

    res.header("X-Total-Count", count.toString());
    res.send(curriculums.map((curriculum) => getCurriculumDTO(curriculum)));
  } catch (error) {
    next(error);
  }
};
