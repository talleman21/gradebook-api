import {Request,Response} from 'express'
import { prisma } from '../../shared'

export const updateOne = async (req:Request,res:Response)=>{
  const updatedCurriculum = await prisma.curriculum.update({
    where:{id:req.params.id},
    data:{
      name:req.body.name,
      subjectId:req.body.subjectId
    }
  })

  res.send(updatedCurriculum)
}

