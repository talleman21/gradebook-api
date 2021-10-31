import { NextFunction, Request, Response } from "express";
import { prisma } from "../../shared";
import { validateStudentInBody, validateIdInParams } from "../../validation";

export const updateOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = await validateIdInParams(req.params);
    const studentToUpdate = await validateStudentInBody(req.body);

    const updatedStudent = await prisma.student.update({
      where: { id },
      data: {
        name: studentToUpdate.name,
        subjects: {
          connect: studentToUpdate.subjectIds.map((subjectId) => ({
            id: subjectId,
          })),
        },
        instructors: {
          connect: studentToUpdate.instructorIds.map((instuctorId) => ({
            id: instuctorId,
          })),
        },
      },
      include: {
        subjects: true,
        instructors: true,
      },
    });

    res.send(updatedStudent);
  } catch (error) {
    next(error);
  }
};
