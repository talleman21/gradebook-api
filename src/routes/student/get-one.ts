import { NextFunction, Request, Response } from "express";
import { prisma } from "../../shared";
import { validateIdInParams } from "../../validation";

export const getOne = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = await validateIdInParams(req.params);

    const student = await prisma.student.findUnique({
      where: { id },
      include: {
        instructors: true,
        subjects: true,
      },
    });

    res.send(student);
  } catch (error) {
    next(error);
  }
};
