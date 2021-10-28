import {Request,Response} from 'express';
import { prisma } from '../../shared';

export const create = async (req:Request,res:Response)=>{
	const createStudent = await prisma.student.create({
		data:{
			name:req.body.name
		}
	});

	res.send(createStudent);
};

