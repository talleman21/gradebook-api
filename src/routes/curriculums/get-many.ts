import { NextFunction, Request, Response } from "express";
import { prisma } from "../../shared";
import { getCurriculumDTO } from "../../formatters";
import {
  validateFilterInQuery,
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
    const orderBy = await validateSortInQuery(req.query);
    const filters = await validateFilterInQuery(req.query, [
      "name",
      "subjectId",
      "instructorId",
    ]);

    const [count, curriculums] = await prisma.$transaction([
      prisma.curriculum.count(),
      prisma.curriculum.findMany({
        skip,
        take,
        where: { AND: filters },
        orderBy,
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
