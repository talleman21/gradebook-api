import { Curriculum } from "@prisma/client";

export const getCurriculum01 = (): Curriculum => ({
  id: "TestCurriculum01",
  name: "TestCurriculum01",
  subjectId: "TestSubject01",
});
