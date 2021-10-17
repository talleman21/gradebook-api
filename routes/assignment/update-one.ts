import {NextFunction, Request,Response} from 'express'
import { prisma } from '../../shared'
import { validateAssignmentInBody, validateIdInParams } from '../../validation'

export const updateOne = async (req:Request,res:Response,next:NextFunction)=>{
  try {
    const id = await validateIdInParams(req.params)
    const assignmentToUpdate = await validateAssignmentInBody(req.body)
    const updatedAssignment = await prisma.assignment.update({
      where:{id},
      data:assignmentToUpdate
    })
  
    res.send(updatedAssignment)    
  } catch (error) {
    next(error)
  }
}
