import {getMany} from '../get-many'
import { response,request } from 'express'
import { prisma } from '../../../shared'
import {assignment01} from '../../../sample-data'

describe('assignment-getMany',()=>{
  let req=request
  let res=response
  let next:any
  let getManyResponse: jest.SpyInstance

  beforeEach(()=>{
    next = jest.fn()
    getManyResponse = jest.spyOn(res,'send')
  })

  afterAll(()=>{
    prisma.$disconnect()
    jest.clearAllMocks()
  })

  it('responds with array of assignments',async()=>{
    //when
    jest.spyOn(prisma.assignment,'findMany').mockResolvedValue([assignment01()])
    
    await getMany(req,res,next)

    //then
    expect(getManyResponse).toHaveBeenCalledWith([assignment01()])
  })

  it('responds with empty array if no assignments found',async()=>{
    
    //when
    jest.spyOn(prisma.assignment,'findMany').mockResolvedValue([])    
    await getMany(req,res,next)

    //then
    expect(getManyResponse).toHaveBeenCalledWith([])
  })
})