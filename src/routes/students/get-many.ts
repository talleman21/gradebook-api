import { NextFunction, Request, Response } from "express";
import { Prisma } from "@prisma/client";
import { getStudentDTO } from "../../formatters";
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
    const modelEnum = Prisma.StudentScalarFieldEnum;
    const { skip, take } = await validatePaginationInQuery(req.query);
    const orderBy = await validateSortInQuery<typeof modelEnum>(
      req.query,
      modelEnum
    );
    const filters = await validateFilterInQuery<typeof modelEnum>(
      req.query,
      modelEnum
    );

    const [count, students] = await prisma.$transaction([
      prisma.student.count(),
      prisma.student.findMany({
        skip,
        take,
        where: { AND: filters },
        orderBy: orderBy,
        include: {
          user: true,
          curriculums: true,
        },
      }),
    ]);

    res.header("X-Total-Count", count.toString());
    res.send(students.map((student) => getStudentDTO(student)));
  } catch (error) {
    next(error);
  }
};
