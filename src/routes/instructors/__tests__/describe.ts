import { describe as describeFunction } from "../describe";
import { response, request } from "express";

describe("assignment-describe", () => {
  const res = response;
  const req = request;
  res.send = jest.fn();

  it("calls res.send with valid object", async () => {
    await describeFunction(req, res);
    expect(res.send).toHaveBeenCalled();
  });
});
