import {Request,Response} from 'express'
import {prisma} from '../../shared'

export const getMany = async (req:Request,res:Response)=>{
  const getSubjects = await prisma.subject.findMany({
    include:{
      students:true
    }
  })
  
  res.send(getSubjects)
}

