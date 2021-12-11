import { NextFunction, Request, Response } from "express";
import { getCurriculumDTO } from "../../formatters";
import { prisma } from "../../shared";
import { validateCurriculumInBody, validateIdInParams } from "../../validation";

export const updateOne = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = await validateIdInParams(req.params);
    const curriculumToUpdate = await validateCurriculumInBody(req.body);
    const updatedCurriculum = await prisma.curriculum.update({
      where: { id },
      data: {
        name: curriculumToUpdate.name,
        subject: { connect: { id: curriculumToUpdate.subjectId } },
        instructor: { connect: { id: curriculumToUpdate.instructorId } },
        students: { set: curriculumToUpdate.studentIds.map((id) => ({ id })) },
      },
      include: {
        subject: true,
        instructor: true,
        students: true,
        assignments: true,
      },
    });

    res.send(getCurriculumDTO(updatedCurriculum));
  } catch (error) {
    next(error);
  }
};
