import { NextFunction, Request, Response } from "express";
import { prisma } from "../../shared";

export const getMany = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const getInstructors = await prisma.instructor.findMany();

    res.send(getInstructors);
  } catch (error) {
    next(error);
  }
};
