import { Request, Response } from "express";
import { Prisma } from "@prisma/client";

export const describe = async (req: Request, res: Response) => {
  const modelEnum = Prisma.GradeScalarFieldEnum;

  res.send({
    description: "Grade route provides grade info",
    fields: modelEnum,
  });
};
