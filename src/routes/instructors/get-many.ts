import { NextFunction, Request, Response } from "express";
import { getInstructorDTO } from "../../formatters";
import { prisma } from "../../shared";

export const getMany = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const [count, instructors] = await prisma.$transaction([
      prisma.instructor.count(),
      prisma.instructor.findMany({
        include: {
          curriculums: true,
        },
      }),
    ]);

    res.header("X-Total-Count", count.toString());
    res.send(instructors.map((instructor) => getInstructorDTO(instructor)));
  } catch (error) {
    next(error);
  }
};
