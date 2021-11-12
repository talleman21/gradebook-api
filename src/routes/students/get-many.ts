import { NextFunction, Request, Response } from "express";
import { getStudentDTO } from "../../formatters";
import { prisma } from "../../shared";

export const getMany = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const getManyStudents = await prisma.student.findMany({
      include: {
        curriculums: true,
      },
    });

    res.header("x-total-count", "10");
    res.header("content-range", "1-10/10");
    res.send(getManyStudents.map((student) => getStudentDTO(student)));
  } catch (error) {
    next(error);
  }
};
