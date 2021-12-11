import { Request, Response } from "express";
import { Prisma } from "@prisma/client";

export const describe = async (req: Request, res: Response) => {
  const modelEnum = Prisma.AssignmentScalarFieldEnum;

  res.send({
    description: "Assignment Route provides assignment info",
    fields: modelEnum,
  });
};
