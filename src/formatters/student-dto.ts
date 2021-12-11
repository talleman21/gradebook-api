import { RawStudent, StudentDTO } from "../types";

export const getStudentDTO = (
  student: RawStudent | null
): StudentDTO | null => {
  if (student) {
    return {
      id: student.id,
      username: student.user.username,
      userId: student.userId,
      curriculumIds: student.curriculums.map(({ id }) => id),
    };
  }
  return null;
};
