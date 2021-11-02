import { NextFunction, Request, Response } from "express";
import { prisma } from "../../shared";

export const getMany = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const getGrades = await prisma.grade.findMany({
      include: {
        student: true,
        assignment: true,
      },
    });

    res.send(getGrades);
  } catch (error) {
    next(error);
  }
};
