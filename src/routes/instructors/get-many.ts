import { NextFunction, Request, Response } from "express";
import { getInstructorDTO } from "../../formatters";
import { prisma } from "../../shared";

export const getMany = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const getInstructors = await prisma.instructor.findMany({
      include: {
        curriculums: true,
      },
    });
    res.header("Content-Range", "0-1/1");
    res.header("X-Total-Count", "1");
    res.send(getInstructors.map((instructor) => getInstructorDTO(instructor)));
  } catch (error) {
    next(error);
  }
};
