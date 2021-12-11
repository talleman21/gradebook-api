import { Curriculum, Student, User } from "@prisma/client";

export type RawStudent = Student & {
  user: User;
  curriculums: Curriculum[];
};

export type StudentDTO = Student & {
  username: string;
  curriculumIds: string[];
};
