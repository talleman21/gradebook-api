import { getOne } from "../get-one";
import { response, request } from "express";
import { prisma } from "../../../shared";
import { getInstructor01, getInstructorDTO01 } from "../../../sample-data";

describe("instructor-get", () => {
  const req = request;
  const res = response;
  let next: jest.Mock;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let rawInstructor: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let instructorDTO: any;
  let findUniqueMock: jest.SpyInstance;
  let resSend: jest.SpyInstance;

  beforeEach(() => {
    req.params = { id: "1" };
    rawInstructor = getInstructor01();
    instructorDTO = getInstructorDTO01();
    next = jest.fn();
    resSend = jest.spyOn(res, "send");
    findUniqueMock = jest.spyOn(prisma.instructor, "findUnique");
  });

  afterAll(() => {
    prisma.$disconnect();
    jest.clearAllMocks();
  });

  it("responds with valid object", async () => {
    //when
    findUniqueMock.mockResolvedValue(rawInstructor);
    await getOne(req, res, next);

    //then
    expect(findUniqueMock).toHaveBeenCalledWith({
      where: { id: "1" },
      include: {
        curriculums: true,
      },
    });
    expect(resSend).toHaveBeenCalledWith(instructorDTO);
  });

  it("responds with null when id not found", async () => {
    //given
    req.params.id = "2";

    //when
    findUniqueMock.mockResolvedValue(null);
    await getOne(req, res, next);

    //then
    expect(resSend).toHaveBeenCalledWith(null);
  });
});
