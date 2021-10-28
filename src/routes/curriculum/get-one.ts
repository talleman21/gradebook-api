import {NextFunction, Request,Response} from 'express';
import { prisma } from '../../shared';
import { validateIdInParams } from '../../validation';

export const getOne = async (req:Request,res:Response,next:NextFunction)=>{
	try {
		const id = await validateIdInParams(req.params);
  
		const curriculum = await prisma.curriculum.findUnique({
			where:{id}
		});
  
		res.send(curriculum);
    
	} catch (error) {
		console.log(error);
		next(error);
	}  
};

