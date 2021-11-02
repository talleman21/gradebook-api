import { NextFunction, Request, Response } from "express";
import { prisma } from "../../shared";
import { validateIdInParams, validateGradeInBody } from "../../validation";

export const updateOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = await validateIdInParams(req.params);
    const gradeToUpdate = await validateGradeInBody(req.body);

    const updatedGrade = await prisma.grade.update({
      where: { id },
      data: {
        grade: gradeToUpdate.grade,
        student: { connect: { id: gradeToUpdate.studentId } },
        assignment: { connect: { id: gradeToUpdate.assignmentId } },
      },
      include: {
        student: true,
        assignment: true,
      },
    });

    res.send(updatedGrade);
  } catch (error) {
    next(error);
  }
};
