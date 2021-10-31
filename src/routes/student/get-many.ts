import { NextFunction, Request, Response } from "express";
import { prisma } from "../../shared";

export const getMany = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const getManyStudents = await prisma.student.findMany({
      include: {
        instructors: true,
        subjects: true,
      },
    });

    res.send(getManyStudents);
  } catch (error) {
    next(error);
  }
};
