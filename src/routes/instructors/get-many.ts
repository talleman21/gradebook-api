import { NextFunction, Request, Response } from "express";
import { getInstructorDTO } from "../../formatters";
import { prisma } from "../../shared";
import { validatePaginationInQuery } from "../../validation";

export const getMany = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { skip, take } = await validatePaginationInQuery(req.query);
    const [count, instructors] = await prisma.$transaction([
      prisma.instructor.count(),
      prisma.instructor.findMany({
        skip,
        take,
        include: {
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
