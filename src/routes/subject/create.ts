import { NextFunction, Request, Response } from "express";
import { prisma } from "../../shared";
import { validateSubjectInBody } from "../../validation";

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const subjectToCreate = await validateSubjectInBody(req.body);

    const createSubject = await prisma.subject.create({
      data: {
        name: subjectToCreate.name,
        students: {
          connect: subjectToCreate.studentIds.map((studentId) => ({
            id: studentId,
          })),
        },
        curriculums: {
          connect: subjectToCreate.curriculumIds.map((curriculumId) => ({
            id: curriculumId,
          })),
        },
      },
      include: {
        students: true,
        curriculums: true,
      },
    });

    res.send(createSubject);
  } catch (error) {
    next(error);
  }
};
