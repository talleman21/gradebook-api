import {Request,Response} from 'express'
import { prisma } from '../../shared'

export const create = async (req:Request,res:Response)=>{
  const createSubject = await prisma.subject.create({
    data:{
      name:req.body.name
    }
  })

  res.send(createSubject)
}

