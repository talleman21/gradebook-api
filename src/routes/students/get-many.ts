import { NextFunction, Request, Response } from "express";
import { getStudentDTO } from "../../formatters";
import { prisma } from "../../shared";
import { validatePaginationInQuery } from "../../validation";

export const getMany = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { skip, take } = await validatePaginationInQuery(req.query);
    const [count, students] = await prisma.$transaction([
      prisma.student.count(),
      prisma.student.findMany({
        skip,
        take,
        include: {
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
