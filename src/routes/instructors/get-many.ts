import { NextFunction, Request, Response } from "express";
import { Prisma } from "@prisma/client";
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
    const modelEnum = Prisma.InstructorScalarFieldEnum;
    const { skip, take } = await validatePaginationInQuery(req.query);
    const orderBy = await validateSortInQuery<typeof modelEnum>(
      req.query,
      modelEnum
    );
    const filters = await validateFilterInQuery<typeof modelEnum>(
      req.query,
      modelEnum
    );
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
