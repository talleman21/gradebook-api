import { Request, Response } from "express";
import { Prisma } from "@prisma/client";

export const describe = async (req: Request, res: Response) => {
  const modelEnum = Prisma.AccountScalarFieldEnum;

  res.send({
    description: "Account route provides account info",
    fields: modelEnum,
  });
};
