import {Request,Response} from 'express';
import { prisma } from '../../shared';

export const create = async (req:Request,res:Response)=>{
	const createInstructor = await prisma.instructor.create({
		data:{
			name:req.body.name
		}
	});

	res.send(createInstructor);
};

