import { create } from "../create";
import { response, request } from "express";
import { prisma } from "../../../shared";
import {
  getUser01,
  getUserBodyObject01,
  getUserDTO01,
} from "../../../sample-data";

describe("user-create", () => {
  const req = request;
  const res = response;
  let next: jest.Mock;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let rawUser: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let userDTO: any;
  let createMock: jest.SpyInstance;
  let resSend: jest.SpyInstance;

  beforeEach(() => {
    req.body = getUserBodyObject01();
    rawUser = getUser01();
    userDTO = getUserDTO01();
    next = jest.fn();
    resSend = jest.spyOn(res, "send");
    createMock = jest.spyOn(prisma.user, "create");
  });

  afterAll(() => {
    prisma.$disconnect();
    jest.clearAllMocks();
  });

  it("responds with valid record", async () => {
    //when
    createMock.mockResolvedValue(rawUser);
    await create(req, res, next);

    //then
    expect(createMock).toHaveBeenCalledWith({
      data: req.body,
    });

    expect(resSend).toHaveBeenCalledWith(userDTO);
  });

  it("calls next function when error encountered", async () => {
    //when
    jest.spyOn(prisma.user, "create").mockRejectedValue("error");
    await create(req, res, next);

    //then
    expect(next).toHaveBeenCalledWith("error");
  });
});
