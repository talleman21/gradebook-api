import express from 'express'
import {getOne} from './get-one'
import {getMany} from './get-many'
import {create} from './create'
import {updateOne} from './update-one'
import {deleteOne} from './delete-one'

export const curriculum = express.Router()

curriculum.get('/',(req,res) => getMany(req,res))
curriculum.get('/:id',(req,res) => getOne(req,res))
curriculum.post('/',(req,res) => create(req,res))
curriculum.put('/:id',(req,res) => updateOne(req,res))
curriculum.delete('/:id',(req,res) => deleteOne(req,res))