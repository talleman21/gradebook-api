import { NextFunction, Request, Response } from "express";
import { prisma } from "../../shared";

export const getMany = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const [count, grades] = await prisma.$transaction([
      prisma.grade.count(),
      prisma.grade.findMany({
        where: { assignmentId: req.query.assignmentId as string },
      }),
    ]);

    res.header("X-Total-Count", count.toString());
    res.send(grades);
  } catch (error) {
    next(error);
  }
};
