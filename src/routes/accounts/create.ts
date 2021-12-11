import { Request, Response, NextFunction } from "express";
import { getAccountDTO } from "../../formatters";
import { prisma } from "../../shared";
import { validateAccountInBody } from "../../validation/validate-account-in-body";

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const accountBody = await validateAccountInBody(req.body);

    const createAccount = await prisma.account.create({
      data: accountBody,
    });

    res.send(getAccountDTO(createAccount));
  } catch (error) {
    next(error);
  }
};
