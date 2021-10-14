import {Request,Response} from 'express'
import { prisma } from '../../shared'

export const getOne = async (req:Request,res:Response)=>{
  const student = await prisma.student.findUnique({
    where:{id:req.params.id}
  })

  res.send(student)

}

