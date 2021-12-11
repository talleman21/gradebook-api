import { RawInstructor, InstructorDTO } from "../types";

export const getInstructorDTO = (
  instructor: RawInstructor | null
): InstructorDTO | null => {
  if (instructor) {
    return {
      id: instructor.id,
      username: instructor.user.username,
      userId: instructor.userId,
      curriculumIds: instructor.curriculums.map(({ id }) => id),
    };
  }
  return null;
};
