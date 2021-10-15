import {Request,Response} from 'express'
import { prisma } from '../../shared'

export const deleteOne = async (req:Request,res:Response)=>{
  const deletedCurriculum = await prisma.curriculum.delete({
    where:{id:req.params.id}
  })
  
  res.send(deletedCurriculum)
}

