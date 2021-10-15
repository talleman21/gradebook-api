import {Request,Response} from 'express'
import { prisma } from '../../shared'

export const create = async (req:Request,res:Response)=>{
  const createAssignment = await prisma.assignment.create({
    data:{
      name:req.body.name,
      grade:req.body.grade,
      description:req.body.description,
      dueDate:new Date(req.body.dueDate)
    }
  })

  res.send(createAssignment)
}

