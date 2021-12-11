import { NextFunction, Request, Response } from "express";
import { prisma } from "../../shared";
import { validateIdInParams } from "../../validation";
import { getStudentDTO } from "../../formatters";

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
        user: true,
        curriculums: true,
      },
    });

    res.send(getStudentDTO(student));
  } catch (error) {
    next(error);
  }
};
