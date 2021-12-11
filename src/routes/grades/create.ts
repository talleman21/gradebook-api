import { NextFunction, Request, Response } from "express";
import { prisma } from "../../shared";
import { validateGradeInBody } from "../../validation";

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const gradeToCreate = await validateGradeInBody(req.body);

    const createGrade = await prisma.grade.create({
      data: {
        grade: gradeToCreate.grade,
        student: {
          connect: { id: gradeToCreate.studentId },
        },
        assignment: {
          connect: { id: gradeToCreate.assignmentId },
        },
      },
    });

    res.send(createGrade);
  } catch (error) {
    next(error);
  }
};
