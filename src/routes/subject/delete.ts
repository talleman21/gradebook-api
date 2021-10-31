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

    const deletedSubject = await prisma.subject.delete({
      where: { id },
      include: {
        students: true,
        curriculums: true,
      },
    });

    res.send(deletedSubject);
  } catch (error) {
    next(error);
  }
};
