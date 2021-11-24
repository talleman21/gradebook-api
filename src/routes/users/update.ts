import { NextFunction, Request, Response } from "express";
import { getUserDTO } from "../../formatters";
import { prisma } from "../../shared";
import { validateUserInBody, validateIdInParams } from "../../validation";

export const updateOne = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = await validateIdInParams(req.params);
    const userToUpdate = await validateUserInBody(req.body);
    const updatedUser = await prisma.user.update({
      where: { id },
      data: userToUpdate,
    });

    res.send(getUserDTO(updatedUser));
  } catch (error) {
    next(error);
  }
};
