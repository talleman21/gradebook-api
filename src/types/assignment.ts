import { Assignment, Grade } from "@prisma/client";

export type RawAssignment = Assignment & {
  grades: Grade[];
};

export type AssignmentDTO = Assignment & {
  gradeIds: string[];
};
