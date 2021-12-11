import { NextFunction, Request, Response } from "express";
import { prisma } from "../../shared";
import { validateIdInParams } from "../../validation";
import { getCurriculumDTO } from "../../formatters";

export const getOne = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = await validateIdInParams(req.params);

    const curriculum = await prisma.curriculum.findUnique({
      where: { id },
      include: {
        subject: true,
        instructor: true,
        students: true,
        assignments: true,
      },
    });

    res.send(getCurriculumDTO(curriculum));
  } catch (error) {
    next(error);
  }
};
