import { Request, Response } from "express";
import { Prisma } from "@prisma/client";

export const describe = async (req: Request, res: Response) => {
  const modelEnum = Prisma.UserScalarFieldEnum;

  res.send({
    description:
      "User Model contains user information, has links to Students and Instructors",
    fields: modelEnum,
  });
};
