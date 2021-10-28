import {deleteOne} from '../delete'
import { response,request } from 'express'
import { prisma } from '../../../shared'
import {getCurriculum01} from '../../../sample-data'

describe('curriculum-delete',()=>{
  let req=request
  let res=response
  let next:any
  let errorCode:any
  let clientVersion:any
  let meta:any
  let error: any

  beforeEach(()=>{
    req.params = {id:"1"}
    next = jest.fn()
  })

  afterAll(()=>{
    prisma.$disconnect()
    jest.clearAllMocks()
  })

  it('responds with deleted curriculum',async()=>{
    //when
    const prismaResponse = jest.spyOn(prisma.curriculum,'delete').mockResolvedValue(getCurriculum01())
    const deleteResponse = jest.spyOn(res,'send')
    await deleteOne(req,res,next)

    //then
    expect(prismaResponse).toHaveBeenCalledWith({
      where:{id:"1"}
    })
    expect(deleteResponse).toHaveBeenCalledWith(getCurriculum01())
  })

  it('rejects with prisma known error when curriculum id not found',async()=>{
    //given
    req.params.id = "2"
    errorCode = 'P2025'
    clientVersion = '3.2.1'
    meta = { cause: 'Record to delete not found.' }
    error = {errorCode,clientVersion,meta}

    //when
    jest.spyOn(prisma.curriculum,'delete').mockRejectedValue(error)    
    await deleteOne(req,res,next)

    //then
    expect(next).toHaveBeenCalledWith(error)
  })
})