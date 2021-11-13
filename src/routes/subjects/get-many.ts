import { NextFunction, Request, Response } from "express";
import { prisma } from "../../shared";
import { getSubjectDTO } from "../../formatters";
import { validatePaginationInQuery } from "../../validation";

export const getMany = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { skip, take } = await validatePaginationInQuery(req.query);
    const [count, subjects] = await prisma.$transaction([
      prisma.subject.count(),
      prisma.subject.findMany({
        skip,
        take,
        include: {
          curriculums: true,
        },
      }),
    ]);

    res.header("X-Total-Count", count.toString());
    res.send(subjects.map((subject) => getSubjectDTO(subject)));
  } catch (error) {
    next(error);
  }
};
