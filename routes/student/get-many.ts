import {Request,Response} from 'express'
import {prisma} from '../../shared'

export const getMany = async (req:Request,res:Response)=>{
  const getStudents = await prisma.student.findMany({
    include:{
      subjects:true
    }
  })

  res.send(getStudents)
}

