import { NextFunction, Request, Response } from "express";
import { Prisma } from "@prisma/client";
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
    const modelEnum = Prisma.AccountScalarFieldEnum;
    const { skip, take } = await validatePaginationInQuery(req.query);
    const orderBy = await validateSortInQuery<typeof modelEnum>(
      req.query,
      modelEnum
    );
    const filters = await validateFilterInQuery<typeof modelEnum>(
      req.query,
      modelEnum
    );

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
