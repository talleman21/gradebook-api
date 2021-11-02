import { Request, Response } from "express";
import { NextFunction } from "express-serve-static-core";
import { prisma } from "../../shared";
import { validateIdInParams } from "../../validation";

export const getOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = await validateIdInParams(req.params);

    const grade = await prisma.grade.findUnique({
      where: { id },
      include: {
        student: true,
        assignment: true,
      },
    });

    res.send(grade);
  } catch (error) {
    next(error);
  }
};
