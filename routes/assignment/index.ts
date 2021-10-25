import express from 'express'
import {getOne} from './get-one'
import {getMany} from './get-many'
import {create} from './create'
import {updateOne} from './update-one'
import {deleteOne} from './delete-one'

export const assignment = express.Router()

assignment.get('/',getMany)
assignment.get('/:id',getOne)
assignment.post('/',create)
assignment.put('/:id',updateOne)
assignment.delete('/:id',deleteOne)
