import { Curriculum, Instructor, User } from "@prisma/client";

export type RawInstructor = Instructor & {
  user: User;
  curriculums: Curriculum[];
};

export type InstructorDTO = Instructor & {
  username: string;
  curriculumIds: string[];
};
