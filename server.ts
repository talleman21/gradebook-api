import express from 'express'
const app = express()
const PORT = process.env.PORT
import {student,subject,curriculum,assignment, instructor} from './routes'


app.use(express.json())

app.use('/instructor',instructor)
app.use('/student',student)
app.use('/subject',subject)
app.use('/curriculum',curriculum)
app.use('/assignment',assignment)




app.listen(process.env.PORT,()=>{
  console.log(`app started on ${PORT}`)
})