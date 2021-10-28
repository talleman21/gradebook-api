import { Request, Response } from "express";
import { prisma } from "../../shared";

export const updateOne = async (req: Request, res: Response) => {
  const updatedSubject = await prisma.subject.update({
    where: { id: req.params.id },
    data: {
      name: req.body.name,
    },
  });

  res.send(updatedSubject);
};
