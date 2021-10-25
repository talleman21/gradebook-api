import {getOne} from '../get-one'
import { response,request } from 'express'
import { prisma } from '../../../shared'
import {assignment01} from '../../../sample-data'

describe('assignment-get',()=>{
  let req=request
  let res=response
  let next:any
  let getResponse:jest.SpyInstance
  let error: any

  beforeEach(()=>{
    req.params = {id:"1"}
    next = jest.fn()
    getResponse = jest.spyOn(res,'send')
  })

  afterAll(()=>{
    prisma.$disconnect()
    jest.clearAllMocks()
  })

  it('responds with get assignment',async()=>{
    //when
    const prismaResponse = jest.spyOn(prisma.assignment,'findUnique').mockResolvedValue(assignment01())
    await getOne(req,res,next)

    //then
    expect(prismaResponse).toHaveBeenCalledWith({
      where:{id:"1"}
    })
    expect(getResponse).toHaveBeenCalledWith(assignment01())
  })

  it('responds with null when assignment id not found',async()=>{
    //given
    req.params.id = "2"

    //when
    jest.spyOn(prisma.assignment,'findUnique').mockResolvedValue(null)    
    await getOne(req,res,next)

    //then
    expect(getResponse).toHaveBeenCalledWith(null)
  })
})