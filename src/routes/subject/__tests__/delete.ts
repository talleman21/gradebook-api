import { deleteOne } from "../delete";
import { response, request } from "express";
import { prisma } from "../../../shared";
import { getSubject01 } from "../../../sample-data";

describe("subject-delete", () => {
  const req = request;
  const res = response;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let next: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let errorCode: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let clientVersion: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let meta: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let error: any;

  beforeEach(() => {
    req.params = { id: "TestSubject01" };
    next = jest.fn();
  });

  afterAll(() => {
    prisma.$disconnect();
    jest.clearAllMocks();
  });

  it("responds with deleted subject", async () => {
    //when
    const prismaResponse = jest
      .spyOn(prisma.subject, "delete")
      .mockResolvedValue(getSubject01());
    const deleteResponse = jest.spyOn(res, "send");
    await deleteOne(req, res, next);

    //then
    expect(prismaResponse).toHaveBeenCalledWith({
      where: { id: "TestSubject01" },
      include: {
        curriculums: true,
        students: true,
      },
    });
    expect(deleteResponse).toHaveBeenCalledWith(getSubject01());
  });

  it("rejects with prisma known error when subject id not found", async () => {
    //given
    req.params.id = "2";
    errorCode = "P2025";
    clientVersion = "3.2.1";
    meta = { cause: "Record to delete not found." };
    error = { errorCode, clientVersion, meta };

    //when
    jest.spyOn(prisma.subject, "delete").mockRejectedValue(error);
    await deleteOne(req, res, next);

    //then
    expect(next).toHaveBeenCalledWith(error);
  });
});
