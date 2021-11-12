import { Request, Response, NextFunction } from "express";
import { getInstructorDTO } from "../../formatters";
import { prisma } from "../../shared";
import { validateInstructorInBody } from "../../validation/validate-instructor-in-body";

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const instructorToCreate = await validateInstructorInBody(req.body);

    const createInstructor = await prisma.instructor.create({
      data: {
        name: instructorToCreate.name,
      },
      include: { curriculums: true },
    });

    res.send(getInstructorDTO(createInstructor));
  } catch (error) {
    next(error);
  }
};
