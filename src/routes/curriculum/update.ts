import {NextFunction, Request,Response} from 'express';
import { prisma } from '../../shared';
import { validateCurriculumInBody, validateIdInParams } from '../../validation';

export const updateOne = async (req:Request,res:Response,next:NextFunction)=>{
	try {
		const id = await validateIdInParams(req.params);
		const curriculumToUpdate = await validateCurriculumInBody(req.body);
		const updatedCurriculum = await prisma.curriculum.update({
			where:{id},
			data:curriculumToUpdate
		});
  
		res.send(updatedCurriculum);    
	} catch (error) {    
		next(error);
	}
};