import { describe as describeFunction } from "../describe";
import { response, request } from "express";

describe("assignment-describe", () => {
  const res = response;
  const req = request;
  const next = jest.fn();
  res.send = jest.fn();

  it("calls res.send with valid object", async () => {
    await describeFunction(req, res, next);
    expect(res.send).toHaveBeenCalled();
  });
});
