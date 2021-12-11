import { NextFunction, Request, Response } from "express";
import { getInstructorDTO } from "../../formatters";
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
): Promise<void> => {
  try {
    const { skip, take } = await validatePaginationInQuery(req.query);
    const orderBy = await validateSortInQuery(req.query);
    const filters = await validateFilterInQuery(req.query, [
      "name",
      "dueDate",
      "curriculumId",
    ]);
    const [count, instructors] = await prisma.$transaction([
      prisma.instructor.count(),
      prisma.instructor.findMany({
        skip,
        take,
        where: { AND: filters },
        orderBy,
        include: {
          user: true,
          curriculums: true,
        },
      }),
    ]);

    res.header("X-Total-Count", count.toString());
    res.send(instructors.map((instructor) => getInstructorDTO(instructor)));
  } catch (error) {
    next(error);
  }
};
