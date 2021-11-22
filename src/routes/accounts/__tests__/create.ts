import { create } from "../create";
import { response, request } from "express";
import { prisma } from "../../../shared";
import {
  getAccount01,
  getAccountBodyObject01,
  getAccountDTO01,
} from "../../../sample-data";

describe("account-create", () => {
  const req = request;
  const res = response;
  let next: jest.Mock;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let rawAccount: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let accountDTO: any;
  let createMock: jest.SpyInstance;
  let resSend: jest.SpyInstance;

  beforeEach(() => {
    req.body = getAccountBodyObject01();
    rawAccount = getAccount01();
    accountDTO = getAccountDTO01();
    next = jest.fn();
    resSend = jest.spyOn(res, "send");
    createMock = jest.spyOn(prisma.account, "create");
  });

  afterAll(() => {
    prisma.$disconnect();
    jest.clearAllMocks();
  });

  it("responds with valid record", async () => {
    //when
    createMock.mockResolvedValue(rawAccount);
    await create(req, res, next);

    //then
    expect(createMock).toHaveBeenCalledWith({
      data: req.body,
    });

    expect(resSend).toHaveBeenCalledWith(accountDTO);
  });

  it("calls next function when error encountered", async () => {
    //when
    jest.spyOn(prisma.account, "create").mockRejectedValue("error");
    await create(req, res, next);

    //then
    expect(next).toHaveBeenCalledWith("error");
  });
});
