import { RawAssignment, AssignmentDTO } from "../types";

export const getAssignmentDTO = (
  assignment: RawAssignment | null
): AssignmentDTO | null => {
  if (assignment) {
    return {
      id: assignment.id,
      name: assignment.name,
      description: assignment.description,
      dueDate: assignment.dueDate,
      curriculumId: assignment.curriculumId,
      gradeIds: assignment.grades.map(({ id }) => id),
    };
  }
  return null;
};
