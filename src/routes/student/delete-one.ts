import { Request, Response } from "express";
import { prisma } from "../../shared";

export const deleteOne = async (req: Request, res: Response) => {
  const deletedStudent = await prisma.student.delete({
    where: { id: req.params.id },
  });

  res.send(deletedStudent);
};
