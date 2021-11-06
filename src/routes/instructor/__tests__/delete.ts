import { deleteOne } from "../delete";
import { response, request } from "express";
import { prisma } from "../../../shared";
import { getInstructor01, getInstructorDTO01 } from "../../../sample-data";

describe("instructor-delete", () => {
  const req = request;
  const res = response;
  let next: jest.Mock;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let rawInstructor: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let instructorDTO: any;
  let deleteMock: jest.SpyInstance;
  let resSend: jest.SpyInstance;

  beforeEach(() => {
    req.params = { id: "1" };
    rawInstructor = getInstructor01();
    instructorDTO = getInstructorDTO01();
    next = jest.fn();
    resSend = jest.spyOn(res, "send");
    deleteMock = jest.spyOn(prisma.instructor, "delete");
  });

  afterAll(() => {
    prisma.$disconnect();
    jest.clearAllMocks();
  });

  it("responds with valid record", async () => {
    //when
    deleteMock.mockResolvedValue(rawInstructor);
    await deleteOne(req, res, next);

    //then
    expect(deleteMock).toHaveBeenCalledWith({
      where: { id: "1" },
      include: {
        curriculums: true,
      },
    });
    expect(resSend).toHaveBeenCalledWith(instructorDTO);
  });

  it("throws error when record not found", async () => {
    //given
    req.params.id = "2";

    //when
    deleteMock.mockRejectedValue("error");
    await deleteOne(req, res, next);

    //then
    expect(next).toHaveBeenCalledWith("error");
  });
});
