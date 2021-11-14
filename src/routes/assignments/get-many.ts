import { NextFunction, Request, Response } from "express";
import { prisma } from "../../shared";
import { getAssignmentDTO } from "../../formatters";
import { validatePaginationInQuery } from "../../validation";
import { validateSortInQuery } from "../../validation/validate-sort-in-query";

export const getMany = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { skip, take } = await validatePaginationInQuery(req.query);
    const { field, sortOrder } = await validateSortInQuery(req.query);
    const [count, assignments] = await prisma.$transaction([
      prisma.assignment.count(),
      prisma.assignment.findMany({
        skip,
        take,
        orderBy: { [field]: sortOrder },
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
