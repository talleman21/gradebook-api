import { NextFunction, Request, Response } from "express";
import { prisma } from "../../shared";
import { validateIdInParams } from "../../validation";
import { getUserDTO } from "../../formatters";

export const getOne = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = await validateIdInParams(req.params);

    const user = await prisma.user.findUnique({
      where: { id },
    });

    res.send(getUserDTO(user));
  } catch (error) {
    next(error);
  }
};
