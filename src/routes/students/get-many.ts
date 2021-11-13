import { NextFunction, Request, Response } from "express";
import { getStudentDTO } from "../../formatters";
import { prisma } from "../../shared";

export const getMany = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const [count, students] = await prisma.$transaction([
      prisma.student.count(),
      prisma.student.findMany({
        include: {
          curriculums: true,
        },
      }),
    ]);

    res.header("X-Total-Count", count.toString());
    res.send(students.map((student) => getStudentDTO(student)));
  } catch (error) {
    next(error);
  }
};
