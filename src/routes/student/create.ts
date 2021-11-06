import { NextFunction, Request, Response } from "express";
import { prisma } from "../../shared";
import { validateStudentInBody } from "../../validation/validate-student-in-body";
import { getStudentDTO } from "../../formatters";

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
        curriculums: {
          connect: studentToCreate.curriculumIds.map((curriculumId) => ({
            id: curriculumId,
          })),
        },
      },
      include: {
        curriculums: true,
      },
    });

    res.send(getStudentDTO(createStudent));
  } catch (error) {
    next(error);
  }
};
