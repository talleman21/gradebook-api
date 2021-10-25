import { Assignment } from "@prisma/client";

export const assignment01 = ():Assignment=>({
  id:'assignmentTest011',
  name:'learn addition',
  grade:87,
  description:'learn all the additions',
  dueDate:new Date('2021-07-08'),
  curriculumId:"curriculumTest01"
})