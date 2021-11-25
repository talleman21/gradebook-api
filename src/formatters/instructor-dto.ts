import { RawInstructor, InstructorDTO } from "../types";

export const getInstructorDTO = (
  instructor: RawInstructor | null
): InstructorDTO | null => {
  if (instructor) {
    return {
      id: instructor.id,
      userId: instructor.userId,
      curriculumIds: instructor.curriculums.map(({ id }) => id),
    };
  }
  return null;
};
