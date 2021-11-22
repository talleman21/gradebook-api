import { NextFunction, Request, Response } from "express";
import { getAccountDTO } from "../../formatters";
import { prisma } from "../../shared";
import { validateIdInParams } from "../../validation";

export const deleteOne = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = await validateIdInParams(req.params);

    const deletedAccount = await prisma.account.delete({
      where: { id },
    });

    res.send(getAccountDTO(deletedAccount));
  } catch (error) {
    next(error);
  }
};
