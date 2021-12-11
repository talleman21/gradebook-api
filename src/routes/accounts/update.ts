import { NextFunction, Request, Response } from "express";
import { getAccountDTO } from "../../formatters";
import { prisma } from "../../shared";
import { validateAccountInBody, validateIdInParams } from "../../validation";

export const updateOne = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = await validateIdInParams(req.params);
    const accountToUpdate = await validateAccountInBody(req.body);
    const updatedAccount = await prisma.account.update({
      where: { id },
      data: accountToUpdate,
    });

    res.send(getAccountDTO(updatedAccount));
  } catch (error) {
    next(error);
  }
};
