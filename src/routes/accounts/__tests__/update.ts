import { updateOne } from "../update";
import { response, request } from "express";
import { prisma } from "../../../shared";
import {
  getAccount01,
  getAccountBodyObject01,
  getAccountDTO01,
} from "../../../sample-data";

describe("account-update", () => {
  const req = request;
  const res = response;
  let next: jest.Mock;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let rawAccount: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let accountDTO: any;
  let updateMock: jest.SpyInstance;
  let resSend: jest.SpyInstance;

  beforeEach(() => {
    req.params = { id: "1" };
    req.body = getAccountBodyObject01();
    rawAccount = getAccount01();
    accountDTO = getAccountDTO01();
    next = jest.fn();
    resSend = jest.spyOn(res, "send");
    updateMock = jest.spyOn(prisma.account, "update");
  });

  afterAll(() => {
    prisma.$disconnect();
    jest.clearAllMocks();
  });

  it("responds with valid object", async () => {
    //when
    updateMock.mockResolvedValue(rawAccount);
    await updateOne(req, res, next);

    //then
    expect(updateMock).toHaveBeenCalledWith({
      where: { id: "1" },
      data: req.body,
    });

    expect(resSend).toHaveBeenCalledWith(accountDTO);
  });

  it("calls next function when error encountered", async () => {
    //when
    jest.spyOn(prisma.account, "update").mockRejectedValue("error");
    await updateOne(req, res, next);

    //then
    expect(next).toHaveBeenCalledWith("error");
  });
});
