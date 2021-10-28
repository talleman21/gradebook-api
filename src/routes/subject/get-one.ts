import { Request, Response } from "express";
import { prisma } from "../../shared";

export const getOne = async (req: Request, res: Response) => {
  const subject = await prisma.subject.findUnique({
    where: { id: req.params.id },
  });

  res.send(subject);
};
