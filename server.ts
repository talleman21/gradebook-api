import express,{Request,Response,NextFunction} from 'express'
const app = express()
const PORT = process.env.PORT
import {student,subject,curriculum,assignment, instructor} from './routes'


app.use(express.json())

app.use('/instructor',instructor)
app.use('/student',student)
app.use('/subject',subject)
app.use('/curriculum',curriculum)
app.use('/assignment',assignment)

// error handler
app.use(function(err:Error & {status:number}, req:Request, res:Response, next:NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err.message);
});




app.listen(process.env.PORT,()=>{
  console.log(`app started on ${PORT}`)
})