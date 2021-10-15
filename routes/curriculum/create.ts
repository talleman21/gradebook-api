import {Request,Response} from 'express'
import { prisma } from '../../shared'

export const create = async (req:Request,res:Response)=>{
  const createCurriculum = await prisma.curriculum.create({
    data:{
      name:req.body.name
    }
  })

  res.send(createCurriculum)
}

