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

    const instructor = await prisma.instructor.findUnique({
      where: { id },
    });

    res.send(instructor);
  } catch (error) {
    next(error);
  }
};
