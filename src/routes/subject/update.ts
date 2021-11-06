import { NextFunction, Request, Response } from "express";
import { prisma } from "../../shared";
import { validateIdInParams, validateSubjectInBody } from "../../validation";
import { getSubjectDTO } from "../../formatters";

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
        curriculums: {
          connect: subjectToUpdate.curriculums.map(({ id }) => ({ id })),
        },
      },
      include: {
        curriculums: true,
      },
    });

    res.send(getSubjectDTO(updatedSubject));
  } catch (error) {
    next(error);
  }
};
