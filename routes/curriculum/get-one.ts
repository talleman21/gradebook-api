import {Request,Response} from 'express'
import { prisma } from '../../shared'

export const getOne = async (req:Request,res:Response)=>{
  const curriculum = await prisma.curriculum.findUnique({
    where:{id:req.params.id}
  })

  res.send(curriculum)
  
}

