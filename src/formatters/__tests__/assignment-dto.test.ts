import { getAssignment01, getAssignmentDTO01 } from "../../sample-data";
import { getAssignmentDTO } from "..";

describe("assignment-dto", () => {
  it("returns a valid dto object", () => {
    const output = getAssignmentDTO(getAssignment01());
    expect(output).toEqual(getAssignmentDTO01());
  });

  it("returns null if no assignment provided", () => {
    const output = getAssignmentDTO(null);
    expect(output).toEqual(null);
  });
});
