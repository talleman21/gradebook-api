import { NextFunction, Request, Response } from "express";
import { prisma } from "../../shared";
import { validateStudentInBody } from "../../validation/validate-student-in-body";

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const studentToCreate = await validateStudentInBody(req.body);

    const createStudent = await prisma.student.create({
      data: {
        name: studentToCreate.name,
        instructors: {
          connect: studentToCreate.instructorIds.map((instructorId) => ({
            id: instructorId,
          })),
        },
        subjects: {
          connect: studentToCreate.subjectIds.map((subjectId) => ({
            id: subjectId,
          })),
        },
      },
      include: {
        instructors: true,
        subjects: true,
      },
    });

    res.send(createStudent);
  } catch (error) {
    next(error);
  }
};
