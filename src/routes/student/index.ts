import express from 'express';
import {getOne} from './get-one';
import {getMany} from './get-many';
import {create} from './create';
import {updateOne} from './update-one';
import {deleteOne} from './delete-one';

export const student = express.Router();

student.get('/',(req,res) => getMany(req,res));
student.get('/:id',(req,res) => getOne(req,res));
student.post('/',(req,res) => create(req,res));
student.put('/:id',(req,res) => updateOne(req,res));
student.delete('/:id',(req,res) => deleteOne(req,res));