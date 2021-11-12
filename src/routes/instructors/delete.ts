import { NextFunction, Request, Response } from "express";
import { getInstructorDTO } from "../../formatters";
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
      include: { curriculums: true },
    });

    res.send(getInstructorDTO(deletedInstructor));
  } catch (error) {
    next(error);
  }
};
