import { getSubject01, getSubjectDTO01 } from "../../sample-data";
import { getSubjectDTO } from "..";

describe("subject-dto", () => {
  it("returns a valid dto object", () => {
    const output = getSubjectDTO(getSubject01());
    expect(output).toEqual(getSubjectDTO01());
  });

  it("returns null if no subject provided", () => {
    const output = getSubjectDTO(null);
    expect(output).toEqual(null);
  });
});
