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

    const subject = await prisma.subject.findUnique({
      where: { id },
      include: {
        students: true,
        curriculums: true,
      },
    });

    res.send(subject);
  } catch (error) {
    next(error);
  }
};
