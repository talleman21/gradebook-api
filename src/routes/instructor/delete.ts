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

    const deletedInstructor = await prisma.instructor.delete({
      where: { id },
    });

    res.send(deletedInstructor);
  } catch (error) {
    next(error);
  }
};
