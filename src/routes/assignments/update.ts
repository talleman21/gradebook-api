import { NextFunction, Request, Response } from "express";
import { getAssignmentDTO } from "../../formatters";
import { prisma } from "../../shared";
import { validateAssignmentInBody, validateIdInParams } from "../../validation";

export const updateOne = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = await validateIdInParams(req.params);
    const assignmentUpdateBody = await validateAssignmentInBody(req.body);
    const updatedAssignment = await prisma.assignment.update({
      where: { id },
      data: {
        name: assignmentUpdateBody.name,
        description: assignmentUpdateBody.description,
        dueDate: assignmentUpdateBody.dueDate,
      },
      include: {
        grades: true,
      },
    });

    res.send(getAssignmentDTO(updatedAssignment));
  } catch (error) {
    next(error);
  }
};
