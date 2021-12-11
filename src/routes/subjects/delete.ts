import { NextFunction, Request, Response } from "express";
import { prisma } from "../../shared";
import { validateIdInParams } from "../../validation";
import { getSubjectDTO } from "../../formatters";

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
        curriculums: true,
      },
    });

    res.send(getSubjectDTO(deletedSubject));
  } catch (error) {
    next(error);
  }
};
