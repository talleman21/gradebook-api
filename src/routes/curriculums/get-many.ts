import { NextFunction, Request, Response } from "express";
import { prisma } from "../../shared";
import { getCurriculumDTO } from "../../formatters";

export const getMany = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const [count, curriculums] = await prisma.$transaction([
      prisma.curriculum.count(),
      prisma.curriculum.findMany({
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
