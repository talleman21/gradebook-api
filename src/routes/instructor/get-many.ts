import { Request, Response } from "express";
import { prisma } from "../../shared";

export const getMany = async (req: Request, res: Response) => {
  const getInstructors = await prisma.instructor.findMany({
    include: {
      students: true,
    },
  });

  res.send(getInstructors);
};
