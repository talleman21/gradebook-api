import { Request, Response } from "express";
import { prisma } from "../../shared";

export const deleteOne = async (req: Request, res: Response) => {
  const deletedSubject = await prisma.subject.delete({
    where: { id: req.params.id },
  });

  res.send(deletedSubject);
};
