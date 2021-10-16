import express from "express";
import '../models/co_founder';
import cofSchema from "../models/co_founder";
import cors from 'cors';
const router = express.Router();

// create co-founder
router.post('/co_founders', (req, res) => {
  const cof = cofSchema(req.body);
  cof
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}));
});

// get all co-founder - not allowed
/*
router.get('/co_founders', (req, res) => {
  cofSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}));
});
*/

// get only one specific co-founder
router.get('/co_founders/:vmid', cors(), (req, res) => {
  cofSchema
    .find({"profileInfo.vmid" : { $eq: req.params.vmid }})
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}));
});

export default router;
