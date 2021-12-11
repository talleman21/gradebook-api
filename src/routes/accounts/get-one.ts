import { NextFunction, Request, Response } from "express";
import { prisma } from "../../shared";
import { validateIdInParams } from "../../validation";
import { getAccountDTO } from "../../formatters";

export const getOne = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = await validateIdInParams(req.params);

    const account = await prisma.account.findUnique({
      where: { id },
    });

    res.send(getAccountDTO(account));
  } catch (error) {
    next(error);
  }
};
