import {Request,Response} from 'express';
import { prisma } from '../../shared';

export const deleteOne = async (req:Request,res:Response)=>{
	const deletedInstructor = await prisma.instructor.delete({
		where:{id:req.params.id}
	});
  
	res.send(deletedInstructor);
};

