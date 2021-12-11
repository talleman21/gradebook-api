import { Request, Response } from "express";
import { Prisma } from "@prisma/client";

export const describe = async (req: Request, res: Response) => {
  const modelEnum = Prisma.InstructorScalarFieldEnum;

  res.send({
    description: "Instructor Route provides instructor info",
    fields: modelEnum,
  });
};
