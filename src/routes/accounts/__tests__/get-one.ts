import { getOne } from "../get-one";
import { response, request } from "express";
import { prisma } from "../../../shared";
import { getAccount01, getAccountDTO01 } from "../../../sample-data";

describe("account-get", () => {
  const req = request;
  const res = response;
  let next: jest.Mock;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let rawAccount: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let accountDTO: any;
  let findUniqueMock: jest.SpyInstance;
  let resSend: jest.SpyInstance;

  beforeEach(() => {
    req.params = { id: "1" };
    rawAccount = getAccount01();
    accountDTO = getAccountDTO01();
    next = jest.fn();
    resSend = jest.spyOn(res, "send");
    findUniqueMock = jest.spyOn(prisma.account, "findUnique");
  });

  afterAll(() => {
    prisma.$disconnect();
    jest.clearAllMocks();
  });

  it("responds with valid object", async () => {
    //when
    findUniqueMock.mockResolvedValue(rawAccount);
    await getOne(req, res, next);

    //then
    expect(findUniqueMock).toHaveBeenCalledWith({
      where: { id: "1" },
    });
    expect(resSend).toHaveBeenCalledWith(accountDTO);
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
