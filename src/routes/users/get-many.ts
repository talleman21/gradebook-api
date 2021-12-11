import { NextFunction, Request, Response } from "express";
import { Prisma } from "@prisma/client";
import { prisma } from "../../shared";
import { getUserDTO } from "../../formatters";
import {
  validateFilterInQuery,
  validatePaginationInQuery,
  validateSortInQuery,
} from "../../validation";

export const getMany = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const modelEnum = Prisma.UserScalarFieldEnum;
    const { skip, take } = await validatePaginationInQuery(req.query);
    const orderBy = await validateSortInQuery<typeof modelEnum>(
      req.query,
      modelEnum
    );
    const filters = await validateFilterInQuery<typeof modelEnum>(
      req.query,
      modelEnum
    );

    const [count, users] = await prisma.$transaction([
      prisma.user.count(),
      prisma.user.findMany({
        skip,
        take,
        where: { AND: filters },
        orderBy,
      }),
    ]);

    res.header("X-Total-Count", count.toString());
    res.send(users.map((user) => getUserDTO(user)));
  } catch (error) {
    next(error);
  }
};
