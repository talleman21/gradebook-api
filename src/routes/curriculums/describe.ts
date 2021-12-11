import { Request, Response } from "express";
import { Prisma } from "@prisma/client";

export const describe = async (req: Request, res: Response) => {
  const modelEnum = Prisma.CurriculumScalarFieldEnum;

  res.send({
    description: "Curriculum route provides curriculum info",
    fields: modelEnum,
  });
};
