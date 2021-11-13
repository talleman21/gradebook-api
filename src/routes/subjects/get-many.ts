import { NextFunction, Request, Response } from "express";
import { prisma } from "../../shared";
import { getSubjectDTO } from "../../formatters";

export const getMany = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const [count, subjects] = await prisma.$transaction([
      prisma.subject.count(),
      prisma.subject.findMany({
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
