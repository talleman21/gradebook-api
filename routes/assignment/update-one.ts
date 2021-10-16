import {Request,Response} from 'express'
import { prisma } from '../../shared'

export const updateOne = async (req:Request,res:Response)=>{
  const updatedAssignment = await prisma.assignment.update({
    where:{id:req.params.id},
    data:{
      name:req.body.name,
      grade:req.body.grade,
      description:req.body.description,
      dueDate:new Date(req.body.dueDate),
      curriculumId:req.body.curriculumId
    }
  })

  res.send(updatedAssignment)
}
