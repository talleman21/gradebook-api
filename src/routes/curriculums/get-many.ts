import { NextFunction, Request, Response } from "express";
import { prisma } from "../../shared";
import { getCurriculumDTO } from "../../formatters";

export const getMany = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const getCurriculums = await prisma.curriculum.findMany({
      include: {
        subject: true,
        instructor: true,
        students: true,
        assignments: true,
      },
    });

    res.header("x-total-count", "10");
    res.header("content-range", "1-10/10");
    res.send(getCurriculums.map((curriculum) => getCurriculumDTO(curriculum)));
  } catch (error) {
    next(error);
  }
};
