import { Request, Response } from "express";
import { prisma } from "../../shared";

export const getOne = async (req: Request, res: Response) => {
  const instructor = await prisma.instructor.findUnique({
    where: { id: req.params.id },
  });

  res.send(instructor);
};
