import { NextFunction, Request, Response } from "express";
import { prisma } from "../../shared";
import { validateSubjectInBody } from "../../validation";
import { getSubjectDTO } from "../../formatters";

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
      },
      include: {
        curriculums: true,
      },
    });

    res.send(getSubjectDTO(createSubject));
  } catch (error) {
    next(error);
  }
};
