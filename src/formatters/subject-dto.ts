import { RawSubject, SubjectDTO } from "../types";

export const getSubjectDTO = (
  subject: RawSubject | null
): SubjectDTO | null => {
  if (subject) {
    return {
      id: subject.id,
      name: subject.name,
      curriculumIds: subject.curriculums.map(({ id }) => id),
    };
  }
  return null;
};
