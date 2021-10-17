import joi from 'joi'
import {Assignment} from '@prisma/client'
import createError from 'http-errors'

const assignmentInBodySchema = joi.object({
  name:joi.string().required(),
  grade:joi.number().max(100).min(0).default(0).required(),
  description:joi.string().required(),
  dueDate:joi.date().default(new Date()).required(),
  curriculumId:joi.string().required()
})

export const validateAssignmentInBody = async (body:Omit<Assignment,'id'>):Promise<Omit<Assignment,'id'>> => {
  try {
    const result = await assignmentInBodySchema.validateAsync(body)
    return result
  } catch (error) {
    throw createError(400,(error as Error).message)
  }
}