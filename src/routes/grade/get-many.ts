import { NextFunction, Request, Response } from "express";
import { prisma } from "../../shared";

export const getMany = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const getGrades = await prisma.grade.findMany({});

    res.header("x-total-count", "10");
    res.header("content-range", "1-10/10");
    res.send(getGrades);
  } catch (error) {
    next(error);
  }
};
