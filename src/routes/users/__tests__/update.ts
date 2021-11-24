import { updateOne } from "../update";
import { response, request } from "express";
import { prisma } from "../../../shared";
import {
  getUser01,
  getUserBodyObject01,
  getUserDTO01,
} from "../../../sample-data";

describe("user-update", () => {
  const req = request;
  const res = response;
  let next: jest.Mock;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let rawUser: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let userDTO: any;
  let updateMock: jest.SpyInstance;
  let resSend: jest.SpyInstance;

  beforeEach(() => {
    req.params = { id: "1" };
    req.body = getUserBodyObject01();
    rawUser = getUser01();
    userDTO = getUserDTO01();
    next = jest.fn();
    resSend = jest.spyOn(res, "send");
    updateMock = jest.spyOn(prisma.user, "update");
  });

  afterAll(() => {
    prisma.$disconnect();
    jest.clearAllMocks();
  });

  it("responds with valid object", async () => {
    //when
    updateMock.mockResolvedValue(rawUser);
    await updateOne(req, res, next);

    //then
    expect(updateMock).toHaveBeenCalledWith({
      where: { id: "1" },
      data: req.body,
    });

    expect(resSend).toHaveBeenCalledWith(userDTO);
  });

  it("calls next function when error encountered", async () => {
    //when
    jest.spyOn(prisma.user, "update").mockRejectedValue("error");
    await updateOne(req, res, next);

    //then
    expect(next).toHaveBeenCalledWith("error");
  });
});
