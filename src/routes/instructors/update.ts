import { NextFunction, Request, Response } from "express";
import { getInstructorDTO } from "../../formatters";
import { prisma } from "../../shared";
import { validateInstructorInBody, validateIdInParams } from "../../validation";

export const updateOne = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = await validateIdInParams(req.params);
    const instructorToUpdate = await validateInstructorInBody(req.body);

    const updatedInstructor = await prisma.instructor.update({
      where: { id },
      data: {
        name: instructorToUpdate.name,
      },
      include: {
        curriculums: true,
      },
    });

    res.send(getInstructorDTO(updatedInstructor));
  } catch (error) {
    next(error);
  }
};
