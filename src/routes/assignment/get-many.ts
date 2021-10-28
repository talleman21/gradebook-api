import {NextFunction, Request,Response} from 'express';
import {prisma} from '../../shared';

export const getMany = async (req:Request,res:Response,next:NextFunction)=>{
	try {
		const getAssignments = await prisma.assignment.findMany();
    
		res.send(getAssignments);
    
	} catch (error) {
		next(error);
	}
};

