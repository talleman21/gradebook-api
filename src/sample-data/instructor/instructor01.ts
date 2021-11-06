import { Instructor } from "@prisma/client";
import { RawInstructor, InstructorDTO } from "../../types";
import { getCurriculum01 } from "../curriculum";

export const getInstructorBodyObject01 = (): Omit<Instructor, "id"> => ({
  name: "TestInstructor01",
});

export const getInstructor01 = (): RawInstructor => ({
  id: "TestInstructor01",
  name: "TestInstructor01",
  curriculums: [getCurriculum01()],
});

export const getInstructorDTO01 = (): InstructorDTO => ({
  id: "TestInstructor01",
  name: "TestInstructor01",
  curriculumIds: ["TestCurriculum01"],
});
