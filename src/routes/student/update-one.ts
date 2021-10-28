import {Request,Response} from 'express';
import { prisma } from '../../shared';

export const updateOne = async (req:Request,res:Response)=>{
	const updatedStudent = await prisma.student.update({
		where:{id:req.params.id},
		data:{
			name:req.body.name,
			subjects:{
				upsert:{
					where:{id:req.params.id},
					create:{name:req.body.subject},
					update:{name:req.body.subject}
				}
			}
		},
		include:{
			subjects:true
		}
	});

	res.send(updatedStudent);
};

