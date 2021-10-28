import { NextFunction, Request, Response } from "express";
import { prisma } from "../../shared";

export const getMany = async (
  req: Request,
  res: Response,
  next: NextFunction
):Promise<void> => {
  try {
    const getCurriculums = await prisma.curriculum.findMany();

    res.send(getCurriculums);
  } catch (error) {
    next(error);
  }
};
