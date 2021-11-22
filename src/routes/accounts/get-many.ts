import { NextFunction, Request, Response } from "express";
import { prisma } from "../../shared";
import { getAccountDTO } from "../../formatters";
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
    const { skip, take } = await validatePaginationInQuery(req.query);
    const orderBy = await validateSortInQuery(req.query);
    const filters = await validateFilterInQuery(req.query, ["name"]);

    const [count, accounts] = await prisma.$transaction([
      prisma.account.count(),
      prisma.account.findMany({
        skip,
        take,
        where: { AND: filters },
        orderBy,
      }),
    ]);

    res.header("X-Total-Count", count.toString());
    res.send(accounts.map((account) => getAccountDTO(account)));
  } catch (error) {
    next(error);
  }
};
