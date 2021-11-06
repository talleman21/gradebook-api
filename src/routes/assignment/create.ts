import { Request, Response, NextFunction } from "express";
import { getAssignmentDTO } from "../../formatters";
import { prisma } from "../../shared";
import { validateAssignmentInBody } from "../../validation/validate-assignment-in-body";

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const assignmentBody = await validateAssignmentInBody(req.body);

    const students = await prisma.curriculum.findUnique({
      where: {
        id: assignmentBody.curriculumId,
      },
      select: {
        students: true,
      },
    });

    const createdAssignment = await prisma.assignment.create({
      data: {
        ...assignmentBody,
        grades: students
          ? {
              createMany: {
                data: students.students.map((student) => ({
                  grade: 0,
                  studentId: student.id,
                })),
              },
            }
          : undefined,
      },
      include: {
        grades: true,
      },
    });

    res.send(getAssignmentDTO(createdAssignment));
  } catch (error) {
    next(error);
  }
};
