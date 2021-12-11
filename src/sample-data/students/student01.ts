import { Student } from "@prisma/client";
import { RawStudent, StudentDTO } from "../../types";
import { getCurriculum01, getUser01 } from "..";

export const getStudentBodyObject01 = (): Omit<Student, "id"> & {
  curriculumIds: string[];
} => ({
  userId: "TestUser01",
  curriculumIds: ["TestCurriculum01"],
});

export const getStudent01 = (): RawStudent => ({
  id: "TestStudent01",
  userId: "TestStudentUserId",
  user: getUser01(),
  curriculums: [getCurriculum01()],
});

export const getStudentDTO01 = (): StudentDTO => ({
  id: "TestStudent01",
  userId: "TestStudentUserId",
  username: "TestUserUsername01",
  curriculumIds: ["TestCurriculum01"],
});
