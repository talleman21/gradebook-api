import { NextFunction, Request, Response } from "express";
import { prisma } from "../../shared";
import { validateIdInParams } from "../../validation";

export const deleteOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = await validateIdInParams(req.params);

    const deletedGrade = await prisma.grade.delete({
      where: { id },
    });

    res.send(deletedGrade);
  } catch (error) {
    next(error);
  }
};
