import express from 'express';
import {getOne} from './get-one';
import {getMany} from './get-many';
import {create} from './create';
import {updateOne} from './update-one';
import {deleteOne} from './delete-one';

export const subject = express.Router();

subject.get('/',(req,res) => getMany(req,res));
subject.get('/:id',(req,res) => getOne(req,res));
subject.post('/',(req,res) => create(req,res));
subject.put('/:id',(req,res) => updateOne(req,res));
subject.delete('/:id',(req,res) => deleteOne(req,res));