import { PrismaClientKnownRequestError, PrismaClientUnknownRequestError } from '@prisma/client/runtime'
import express,{Request,Response,NextFunction} from 'express'
const app = express()
const PORT = process.env.PORT
import {
  student,
  subject,
  curriculum,
  assignment, 
  instructor} from './routes'


app.use(express.json())

app.use('/instructor',instructor)
app.use('/student',student)
app.use('/subject',subject)
app.use('/curriculum',curriculum)
app.use('/assignment',assignment)

// error handler
app.use(function(err:Error & {status:number}|any, req:Request, res:Response, next:NextFunction) {
  if(err instanceof PrismaClientKnownRequestError || err instanceof PrismaClientUnknownRequestError){
    //@ts-ignore
    console.log(err.code)
  }

  // render the error page
  res.status(err.status || 500);
  res.send(err.message);
});




app.listen(process.env.PORT,()=>{
  console.log(`app started on ${PORT}`)
})