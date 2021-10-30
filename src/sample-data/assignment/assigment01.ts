import { Assignment } from "@prisma/client";

export const assignment01 = (): Assignment => ({
  id: "TestAssignment01",
  name: "TestAssignment01",
  grade: 87,
  description: "learn all the additions",
  dueDate: new Date("2021-07-08"),
  curriculumId: "curriculumTest01",
});
