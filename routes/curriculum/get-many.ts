import {Request,Response} from 'express'
import {prisma} from '../../shared'

export const getMany = async (req:Request,res:Response)=>{
  const getCurriculums = await prisma.curriculum.findMany({

  })
  
  res.send(getCurriculums)
}

