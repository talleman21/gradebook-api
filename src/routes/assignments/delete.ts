import { NextFunction, Request, Response } from "express";
import { getAssignmentDTO } from "../../formatters";
import { prisma } from "../../shared";
import { validateIdInParams } from "../../validation";

export const deleteOne = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = await validateIdInParams(req.params);

    const deletedAssignment = await prisma.assignment.delete({
      where: { id },
      include: {
        grades: true,
      },
    });

    res.send(getAssignmentDTO(deletedAssignment));
  } catch (error) {
    next(error);
  }
};
