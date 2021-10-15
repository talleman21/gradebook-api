import {Request,Response} from 'express'
import { prisma } from '../../shared'

export const deleteOne = async (req:Request,res:Response)=>{
  const deletedAssignment = await prisma.assignment.delete({
    where:{id:req.params.id}
  })
  
  res.send(deletedAssignment)
}

