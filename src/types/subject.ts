import { Subject, Curriculum } from "@prisma/client";

export type RawSubject = Subject & {
  curriculums: Curriculum[];
};

export type SubjectDTO = Subject & {
  curriculumIds: string[];
};
