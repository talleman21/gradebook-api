import { NextFunction, Request, Response } from "express";
import { prisma } from "../../shared";
import { getAssignmentDTO } from "../../formatters";

export const getMany = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const assignments = await prisma.assignment.findMany({
      include: {
        grades: true,
      },
    });

    res.header("x-total-count", "10");
    res.header("content-range", "1-10/10");
    res.send(assignments.map((assignment) => getAssignmentDTO(assignment)));
  } catch (error) {
    next(error);
  }
};
