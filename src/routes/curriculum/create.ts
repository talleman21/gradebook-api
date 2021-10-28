import { Request, Response, NextFunction } from "express";
import { prisma } from "../../shared";
import { validateCurriculumInBody } from "../../validation/validate-curriculum-in-body";

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const curriculumBody = await validateCurriculumInBody(req.body);

    const createCurriculum = await prisma.curriculum.create({
      data: curriculumBody,
    });

    res.send(createCurriculum);
  } catch (error) {
    next(error);
  }
};
