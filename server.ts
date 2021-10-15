import express from 'express'
const app = express()
const PORT = process.env.PORT
import {student,subject,curriculum} from './routes'


app.use(express.json())

app.use('/student',student)
app.use('/subject',subject)
app.use('/curriculum',curriculum)




app.listen(process.env.PORT,()=>{
  console.log(`app started on ${PORT}`)
})