import { NextFunction, Request, Response } from "express";
import { prisma } from "../../shared";
import { validateIdInParams, validateSubjectInBody } from "../../validation";

export const updateOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = await validateIdInParams(req.params);
    const subjectToUpdate = await validateSubjectInBody(req.body);

    const updatedSubject = await prisma.subject.update({
      where: { id },
      data: {
        name: subjectToUpdate.name,
        students: {
          connect: subjectToUpdate.studentIds.map((studentId) => ({
            id: studentId,
          })),
        },
        curriculums: {
          connect: subjectToUpdate.curriculumIds.map((curriculumId) => ({
            id: curriculumId,
          })),
        },
      },
      include: {
        students: true,
        curriculums: true,
      },
    });

    res.send(updatedSubject);
  } catch (error) {
    next(error);
  }
};
