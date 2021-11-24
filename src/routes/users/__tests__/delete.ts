import { deleteOne } from "../delete";
import { response, request } from "express";
import { prisma } from "../../../shared";
import { getUser01, getUserDTO01 } from "../../../sample-data";

describe("user-delete", () => {
  const req = request;
  const res = response;
  let next: jest.Mock;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let rawUser: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let userDTO: any;
  let deleteMock: jest.SpyInstance;
  let resSend: jest.SpyInstance;

  beforeEach(() => {
    req.params = { id: "1" };
    rawUser = getUser01();
    userDTO = getUserDTO01();
    next = jest.fn();
    resSend = jest.spyOn(res, "send");
    deleteMock = jest.spyOn(prisma.user, "delete");
  });

  afterAll(() => {
    prisma.$disconnect();
    jest.clearAllMocks();
  });

  it("responds with valid record", async () => {
    //when
    deleteMock.mockResolvedValue(rawUser);
    await deleteOne(req, res, next);

    //then
    expect(deleteMock).toHaveBeenCalledWith({
      where: { id: "1" },
    });
    expect(resSend).toHaveBeenCalledWith(userDTO);
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
