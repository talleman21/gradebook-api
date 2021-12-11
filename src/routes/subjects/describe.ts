import { Request, Response } from "express";
import { Prisma } from "@prisma/client";

export const describe = async (req: Request, res: Response) => {
  const modelEnum = Prisma.SubjectScalarFieldEnum;

  res.send({
    description:
      "Subject routes provides access to subjects. Subjects are the parent of curriculums",
    fields: modelEnum,
  });
};
