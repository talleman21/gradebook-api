import {Request,Response} from 'express'
import {prisma} from '../../shared'

export const getMany = async (req:Request,res:Response)=>{
  const getAssignments = await prisma.assignment.findMany({

  })
  
  res.send(getAssignments)
}
