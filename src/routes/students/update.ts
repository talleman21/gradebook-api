import { NextFunction, Request, Response } from "express";
import { getStudentDTO } from "../../formatters";
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
        user: { connect: { id: studentToUpdate.userId } },
        curriculums: {
          connect: studentToUpdate.curriculumIds.map((curriculumId) => ({
            id: curriculumId,
          })),
        },
      },
      include: {
        curriculums: true,
      },
    });

    res.send(getStudentDTO(updatedStudent));
  } catch (error) {
    next(error);
  }
};
