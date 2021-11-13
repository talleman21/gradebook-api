import { getCurriculum01, getCurriculumDTO01 } from "../../sample-data";
import { getCurriculumDTO } from "..";

describe("curriculum-dto", () => {
  it("returns a valid dto object", () => {
    const output = getCurriculumDTO(getCurriculum01());
    expect(output).toEqual(getCurriculumDTO01());
  });

  it("returns null if no curriculum provided", () => {
    const output = getCurriculumDTO(null);
    expect(output).toEqual(null);
  });
});
