import { Request, Response } from "express";
import { Prisma } from "@prisma/client";

export const describe = async (req: Request, res: Response) => {
  const modelEnum = Prisma.StudentScalarFieldEnum;

  res.send({
    description: "Student route holds student information",
    fields: modelEnum,
  });
};
