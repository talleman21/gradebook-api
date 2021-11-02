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
          connect: subjectToUpdate.students.map(({ id }) => ({ id })),
        },
        curriculums: {
          connect: subjectToUpdate.curriculums.map(({ id }) => ({ id })),
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
