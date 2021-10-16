import {Request,Response} from 'express'
import { prisma } from '../../shared'

export const getOne = async (req:Request,res:Response)=>{
  const assignment = await prisma.assignment.findUnique({
    where:{id:req.params.id}
  })

  res.send(assignment)
  
}
