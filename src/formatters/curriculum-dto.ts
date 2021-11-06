import { RawCurriculum, CurriculumDTO } from "../types";

export const getCurriculumDTO = (
  curriculum: RawCurriculum | null
): CurriculumDTO | null => {
  if (curriculum) {
    return {
      id: curriculum.id,
      name: curriculum.name,
      subjectId: curriculum.subjectId,
      instructorId: curriculum.instructorId,
      studentIds: curriculum.students.map(({ id }) => id),
      assignmentIds: curriculum.assignments.map(({ id }) => id),
    };
  }
  return null;
};
