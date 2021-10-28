import joi from 'joi'
import {Curriculum} from '@prisma/client'
import createError from 'http-errors'

const curriculumInBodySchema = joi.object({
  name:joi.string().required(),
  subjectId:joi.string().required()
})

export const validateCurriculumInBody = async (body:Omit<Curriculum,'id'>):Promise<Omit<Curriculum,'id'>> => {
  try {
    const result = await curriculumInBodySchema.validateAsync(body)
    return result
  } catch (error) {
    throw createError(400,(error as Error).message)
  }
}