import { Request, Response, NextFunction } from "express";
import { prisma } from "../../shared";
import { validateAssignmentInBody } from "../../validation/validate-assignment-in-body";

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const assignmentBody = await validateAssignmentInBody(req.body);

    const createAssignment = await prisma.assignment.create({
      data: assignmentBody,
    });

    res.send(createAssignment);
  } catch (error) {
    next(      error);
  }
};
