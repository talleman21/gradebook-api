import { Request, Response, NextFunction } from "express";
import { getCurriculumDTO } from "../../formatters";
import { prisma } from "../../shared";
import { validateCurriculumInBody } from "../../validation/validate-curriculum-in-body";

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const curriculumBody = await validateCurriculumInBody(req.body);

    const createCurriculum = await prisma.curriculum.create({
      data: {
        name: curriculumBody.name,
        subject: { connect: { id: curriculumBody.subjectId } },
        instructor: { connect: { id: curriculumBody.instructorId } },
        students: { connect: curriculumBody.studentIds.map((id) => ({ id })) },
      },
      include: {
        subject: true,
        instructor: true,
        students: true,
        assignments: true,
      },
    });

    res.send(getCurriculumDTO(createCurriculum));
  } catch (error) {
    next(error);
  }
};
