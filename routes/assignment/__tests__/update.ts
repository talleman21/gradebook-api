import {updateOne} from '../update'
import { response,request } from 'express'
import { prisma } from '../../../shared'
import {assignment01} from '../../../sample-data'
import createHttpError from 'http-errors'

describe('assignment-update',()=>{
  let req=request
  let res=response
  let next:any
  let errorCode:any
  let clientVersion:any
  let meta:any
  let error: any

  beforeEach(()=>{
    req.body = assignment01()
    req.params = {id:"1"}
    delete req.body.id
    next = jest.fn()
  })

  afterAll(()=>{
    prisma.$disconnect()
    jest.clearAllMocks()
  })

  it('responds with created assignment',async()=>{
    //when
    const prismaResponse = jest.spyOn(prisma.assignment,'update').mockResolvedValue(assignment01())
    const updateResponse = jest.spyOn(res,'send')
    await updateOne(req,res,next)

    //then
    expect(prismaResponse).toHaveBeenCalledWith({
      where:{id:"1"},
      data:req.body
    })
    expect(updateResponse).toHaveBeenCalledWith(assignment01())
  })

  it('rejects with a bad request error when missing required field',async()=>{
    //given
    delete req.body.name

    //when
    await updateOne(req,res,next)

    //then
    expect(next).toHaveBeenCalledWith(createHttpError(400,'"name" is required'))
  })

  it('rejects with a bad request error when unknown field provided',async()=>{
    //given
    req.body.unknownField = 'unknown field'

    //when
    await updateOne(req,res,next)

    //then
    expect(next).toHaveBeenCalledWith(createHttpError(400,'"unknownField" is not allowed'))
  })

  it('rejects with prisma known error when assignment id not found',async()=>{
    //given
    req.params.id = "2"
    errorCode = 'P2025'
    clientVersion = '3.2.1'
    meta = { cause: 'Record to update not found.' }
    error = {errorCode,clientVersion,meta}

    //when
    jest.spyOn(prisma.assignment,'update').mockRejectedValue(error)    
    await updateOne(req,res,next)

    //then
    expect(next).toHaveBeenCalledWith(error)
  })

  it('rejects with prisma known error when curriculumId not found',async()=>{
    //given
    req.body.curriculumId = 'invalid curriculum id'
    errorCode = 'P2003'
    clientVersion = '3.2.1'
    meta = { field_name: 'Assignment_curriculumId_fkey (index)'}
    error = {errorCode,clientVersion,meta}

    //when
    jest.spyOn(prisma.assignment,'update').mockRejectedValue(error)    
    await updateOne(req,res,next)

    //then
    expect(next).toHaveBeenCalledWith(error)
  })
})