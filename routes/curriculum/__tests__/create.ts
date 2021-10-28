import {create} from '../create'
import { response,request } from 'express'
import { prisma } from '../../../shared'
import {getCurriculum01} from '../../../sample-data'
import createHttpError from 'http-errors'

describe('curriculum-create',()=>{
  let req=request
  let res=response
  let next:any
  let errorCode:any
  let clientVersion:any
  let meta:any
  let error: any

  beforeEach(()=>{
    req.body=getCurriculum01()
    delete req.body.id
    next = jest.fn()
  })

  afterAll(()=>{
    prisma.$disconnect()
    jest.clearAllMocks()
  })

  it('responds with created curriculum',async()=>{
    //when
    jest.spyOn(prisma.curriculum,'create').mockResolvedValue(getCurriculum01())
    const myResponse = jest.spyOn(res,'send')
    await create(req,res,next)

    //then
    expect(myResponse).toHaveBeenCalledWith(getCurriculum01())
  })

  it('rejects with a bad request error when missing required field',async()=>{
    //given
    delete req.body.name

    //when
    await create(req,res,next)

    //then
    expect(next).toHaveBeenCalledWith(createHttpError(400,'"name" is required'))
  })

  it('rejects with a bad request error when unknown field provided',async()=>{
    //given
    req.body.unknownField = 'unknown field'

    //when
    await create(req,res,next)

    //then
    expect(next).toHaveBeenCalledWith(createHttpError(400,'"unknownField" is not allowed'))
  })

  it('rejects with prisma known error when fkey not found',async()=>{
    //given
    req.body.subjectId = 'invalid subject id'
    errorCode = 'P2003'
    clientVersion = '3.2.1'
    meta = { field_name: 'Subject_subjectId_fkey (index)'}
    error = {errorCode,clientVersion,meta}

    //when
    jest.spyOn(prisma.curriculum,'create').mockRejectedValue(error)    
    await create(req,res,next)

    //then
    expect(next).toHaveBeenCalledWith(error)
  })
})