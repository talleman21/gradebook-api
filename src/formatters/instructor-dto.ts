import { RawInstructor, InstructorDTO } from "../types";

export const getInstructorDTO = (
  instructor: RawInstructor | null
): InstructorDTO | null => {
  if (instructor) {
    return {
      id: instructor.id,
      name: instructor.name,
      curriculumIds: instructor.curriculums.map(({ id }) => id),
    };
  }
  return null;
};
