import { Instructor } from "@prisma/client";
import { RawInstructor, InstructorDTO } from "../../types";
import { getCurriculum01 } from "../curriculums";
import { getUser01 } from "..";

export const getInstructorBodyObject01 = (): Omit<Instructor, "id"> => ({
  userId: "TestUser01",
});

export const getInstructor01 = (): RawInstructor => ({
  id: "TestInstructor01",
  user: getUser01(),
  userId: "TestUser01",
  curriculums: [getCurriculum01()],
});

export const getInstructorDTO01 = (): InstructorDTO => ({
  id: "TestInstructor01",
  username: "TestUserUsername01",
  userId: "TestUser01",
  curriculumIds: ["TestCurriculum01"],
});
