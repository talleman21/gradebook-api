import { NextFunction, Request, Response } from "express";
import { prisma } from "../../shared";
import { getSubjectDTO } from "../../formatters";

export const getMany = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const getSubjects = await prisma.subject.findMany({
      include: {
        curriculums: true,
      },
    });
    res.header("X-Total-Count", "1");
    res.send(getSubjects.map((subject) => getSubjectDTO(subject)));
  } catch (error) {
    next(error);
  }
};
