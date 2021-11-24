import { NextFunction, Request, Response } from "express";
import { getUserDTO } from "../../formatters";
import { prisma } from "../../shared";
import { validateIdInParams } from "../../validation";

export const deleteOne = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = await validateIdInParams(req.params);

    const deletedUser = await prisma.user.delete({
      where: { id },
    });

    res.send(getUserDTO(deletedUser));
  } catch (error) {
    next(error);
  }
};
