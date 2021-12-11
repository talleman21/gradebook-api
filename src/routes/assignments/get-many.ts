import { NextFunction, Request, Response } from "express";
import { Prisma } from "@prisma/client";
import { prisma } from "../../shared";
import { getAssignmentDTO } from "../../formatters";
import {
  validateFilterInQuery,
  validatePaginationInQuery,
} from "../../validation";
import { validateSortInQuery } from "../../validation/validate-sort-in-query";

export const getMany = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const modelEnum = Prisma.AssignmentScalarFieldEnum;
    const { skip, take } = await validatePaginationInQuery(req.query);
    const orderBy = await validateSortInQuery<typeof modelEnum>(
      req.query,
      modelEnum
    );
    const filters = await validateFilterInQuery<typeof modelEnum>(
      req.query,
      modelEnum
    );

    const [count, assignments] = await prisma.$transaction([
      prisma.assignment.count(),
      prisma.assignment.findMany({
        skip,
        take,
        where: { AND: filters },
        orderBy,
        include: {
          grades: true,
        },
      }),
    ]);

    res.header("X-Total-Count", count.toString());
    res.send(assignments.map((assignment) => getAssignmentDTO(assignment)));
  } catch (error) {
    next(error);
  }
};
