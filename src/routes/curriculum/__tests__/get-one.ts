import {getOne} from '../get-one';
import { response,request } from 'express';
import { prisma } from '../../../shared';
import {getCurriculum01} from '../../../sample-data';

describe('curriculum-get',()=>{
	const req=request;
	const res=response;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let next:any;
	let getResponse:jest.SpyInstance;

	beforeEach(()=>{
		req.params = {id:'1'};
		next = jest.fn();
		getResponse = jest.spyOn(res,'send');
	});

	afterAll(()=>{
		prisma.$disconnect();
		jest.clearAllMocks();
	});

	it('responds with get curriculum',async()=>{
		//when
		const prismaResponse = jest.spyOn(prisma.curriculum,'findUnique').mockResolvedValue(getCurriculum01());
		await getOne(req,res,next);

		//then
		expect(prismaResponse).toHaveBeenCalledWith({
			where:{id:'1'}
		});
		expect(getResponse).toHaveBeenCalledWith(getCurriculum01());
	});

	it('responds with null when curriculum id not found',async()=>{
		//given
		req.params.id = '2';

		//when
		jest.spyOn(prisma.curriculum,'findUnique').mockResolvedValue(null);    
		await getOne(req,res,next);

		//then
		expect(getResponse).toHaveBeenCalledWith(null);
	});
});