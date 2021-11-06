import { Curriculum, Instructor } from "@prisma/client";

export type RawInstructor = Instructor & {
  curriculums: Curriculum[];
};

export type InstructorDTO = Instructor & {
  curriculumIds: string[];
};
