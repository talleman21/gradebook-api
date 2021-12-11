import { NextFunction, Request, Response } from "express";
import { prisma } from "../../shared";
import { validateIdInParams } from "../../validation";
import { getAssignmentDTO } from "../../formatters";

export const getOne = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = await validateIdInParams(req.params);

    const assignment = await prisma.assignment.findUnique({
      where: { id },
      include: { grades: true },
    });

    res.send(getAssignmentDTO(assignment));
  } catch (error) {
    next(error);
  }
};
