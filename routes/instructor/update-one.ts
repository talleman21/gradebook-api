import {Request,Response} from 'express'
import { prisma } from '../../shared'

export const updateOne = async (req:Request,res:Response)=>{
  try {
    const updatedInstructor = await prisma.instructor.update({
      where:{id:req.params.id},
      data:{
        name:req.body.name,
        students:req.body.studentId ? {
          connect:{
            id:req.body.studentId
          }
        } : undefined
      },
      include:{
        students:true
      }
    })
    
    res.send(updatedInstructor)
  } catch (error) {
    res.send(error)
  }

}

