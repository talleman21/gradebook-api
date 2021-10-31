import { NextFunction, Request, Response } from "express";
import { prisma } from "../../shared";

export const getMany = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const getSubjects = await prisma.subject.findMany({
      include: {
        students: true,
        curriculums: true,
      },
    });

    res.send(getSubjects);
  } catch (error) {
    next(error);
  }
};
