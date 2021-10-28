import { NextFunction, Request, Response } from "express";
import { prisma } from "../../shared";
import { validateIdInParams } from "../../validation";

export const getOne = async (
  req: Request,
  res: Response,
  next: NextFunction
):Promise<void> => {
  try {
    const id = await validateIdInParams(req.params);

    const assignment = await prisma.assignment.findUnique({
      where: { id },
    });

    res.send(assignment);
  } catch (error) {
    console.log(error);
    next(error);
  }
};