import express from 'express'
import {getOne} from './get-one'
import {getMany} from './get-many'
import {create} from './create'
import {updateOne} from './update-one'
import {deleteOne} from './delete-one'

export const assignment = express.Router()

assignment.get('/',(req,res) => getMany(req,res))
assignment.get('/:id',(req,res) => getOne(req,res))
assignment.post('/',(req,res) => create(req,res))
assignment.put('/:id',(req,res) => updateOne(req,res))
assignment.delete('/:id',(req,res) => deleteOne(req,res))