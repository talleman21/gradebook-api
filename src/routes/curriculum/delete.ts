import { NextFunction, Request, Response } from "express";
import { prisma } from "../../shared";
import { validateIdInParams } from "../../validation";

export const deleteOne = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = await validateIdInParams(req.params);

    const deletedCurriculum = await prisma.curriculum.delete({
      where: { id },
    });

    res.send(deletedCurriculum);
  } catch (error) {
    next(error);
  }
};
