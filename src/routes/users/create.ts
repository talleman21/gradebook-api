import { Request, Response, NextFunction } from "express";
import { getUserDTO } from "../../formatters";
import { prisma } from "../../shared";
import { validateUserInBody } from "../../validation/validate-user-in-body";

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userBody = await validateUserInBody(req.body);

    const createUser = await prisma.user.create({
      data: userBody,
    });

    res.send(getUserDTO(createUser));
  } catch (error) {
    next(error);
  }
};
