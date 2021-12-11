import { getStudent01, getStudentDTO01 } from "../../sample-data";
import { getStudentDTO } from "..";

describe("student-dto", () => {
  it("returns a valid dto object", () => {
    const output = getStudentDTO(getStudent01());
    expect(output).toEqual(getStudentDTO01());
  });

  it("returns null if no student provided", () => {
    const output = getStudentDTO(null);
    expect(output).toEqual(null);
  });
});
