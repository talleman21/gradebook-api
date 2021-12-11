import { NextFunction, Request, Response } from "express";
import { prisma } from "../../shared";
import { validateIdInParams } from "../../validation";
import { getStudentDTO } from "../../formatters";

export const deleteOne = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = await validateIdInParams(req.params);

    const deletedStudent = await prisma.student.delete({
      where: { id },
      include: { user: true, curriculums: true },
    });

    res.send(getStudentDTO(deletedStudent));
  } catch (error) {
    next(error);
  }
};
