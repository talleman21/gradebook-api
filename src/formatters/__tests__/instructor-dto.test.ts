import { getInstructor01, getInstructorDTO01 } from "../../sample-data";
import { getInstructorDTO } from "..";

describe("instructor-dto", () => {
  it("returns a valid dto object", () => {
    const output = getInstructorDTO(getInstructor01());
    expect(output).toEqual(getInstructorDTO01());
  });

  it("returns null if no instructor provided", () => {
    const output = getInstructorDTO(null);
    expect(output).toEqual(null);
  });
});
