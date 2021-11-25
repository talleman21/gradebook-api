import { Instructor } from "@prisma/client";
import { RawInstructor, InstructorDTO } from "../../types";
import { getCurriculum01 } from "../curriculums";

export const getInstructorBodyObject01 = (): Omit<Instructor, "id"> => ({
  userId: "TestUser01",
});

export const getInstructor01 = (): RawInstructor => ({
  id: "TestInstructor01",
  userId: "TestUser01",
  curriculums: [getCurriculum01()],
});

export const getInstructorDTO01 = (): InstructorDTO => ({
  id: "TestInstructor01",
  userId: "TestUser01",
  curriculumIds: ["TestCurriculum01"],
});
