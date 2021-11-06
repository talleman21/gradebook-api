import { AssignmentDTO, RawAssignment } from "../../types";
import { getGrade01 } from "..";
import { Assignment } from "@prisma/client";

export const getAssignmentBodyObject01 = (): Omit<Assignment, "id"> => ({
  name: "TestAssignment01",
  description: "learn all the additions",
  dueDate: new Date("2021-07-08"),
  curriculumId: "TestCurriculum01",
});

export const getAssignment01 = (): RawAssignment => ({
  id: "TestAssignment01",
  name: "TestAssignment01",
  description: "learn all the additions",
  dueDate: new Date("2021-07-08"),
  curriculumId: "TestCurriculum01",
  grades: [getGrade01()],
});

export const getAssignmentDTO01 = (): AssignmentDTO => ({
  id: "TestAssignment01",
  name: "TestAssignment01",
  description: "learn all the additions",
  dueDate: new Date("2021-07-08"),
  curriculumId: "TestCurriculum01",
  gradeIds: ["TestGrade01"],
});
