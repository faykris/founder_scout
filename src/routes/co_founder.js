import express from "express";
import '../models/co_founder';
import cofSchema from "../models/co_founder";
import cors from 'cors';
const router = express.Router();

// create co-founder
router.post('/co-founders', (req, res) => {
  const cof = cofSchema(req.body);
  cof
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}));
});

// get all co-founders - not allowed
/*
router.get('/co_founders', (req, res) => {
  cofSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}));
});
*/

// get only one specific co-founder by vmid
router.get('/co-founders/vmid/:vmid', cors(), (req, res) => {
  cofSchema
    .findOne({"profileInfo.vmid" : { $eq: req.params.vmid }})
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}));
});

// get co-founders by country
router.get('/co-founders/country/:country', cors(), (req, res) => {
  console.log(req.params.location || undefined);
  cofSchema
    .find({"companyInfo.location.country": { $regex: new RegExp(req.params.country), $options: "i" }})
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}));
});

// get co-founders by country on current year
router.get('/co-founders/country/:country/:year', cors(), (req, res) => {
  console.log(req.params.location || undefined);
  cofSchema
    .find({$and: [{"companyInfo.location.country": { $regex: new RegExp(req.params.country), $options: "i" }},
         {"companyInfo.createdAt.year": {$eq: parseInt(req.params.year)}}
         ]})
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}));
});

// get co-founders by country on current year and month
router.get('/co-founders/country/:country/:year/:month', cors(), (req, res) => {
  console.log(req.params.location || undefined);
  cofSchema
    .find({$and: [{"companyInfo.location.country": { $regex: new RegExp(req.params.country), $options: "i" }},
         {"companyInfo.createdAt.year": {$eq: parseInt(req.params.year)}},
         {"companyInfo.createdAt.month": {$eq: parseInt(req.params.month)}}
         ]})
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}));
});

// get co-founders by city
router.get('/co-founders/city/:city', cors(), (req, res) => {
  console.log(req.params.location || undefined);
  cofSchema
    .find({"companyInfo.location.city": { $regex: new RegExp("^" + req.params.city + "$", "i")} })
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}));
});

// get co-founders by city on current year
router.get('/co-founders/city/:city/:year', cors(), (req, res) => {
  console.log(req.params.location || undefined);
  cofSchema
    .find({$and: [{"companyInfo.location.city": { $regex: new RegExp("^" + req.params.city + "$", "i")}},
        {"companyInfo.createdAt.year": {$eq: parseInt(req.params.year)}}
      ]})
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}));
});

// get co-founders by city on current year and month
router.get('/co-founders/city/:city/:year/:month', cors(), (req, res) => {
  console.log(req.params.location || undefined);
  cofSchema
    .find({$and: [{"companyInfo.location.city": { $regex: new RegExp("^" + req.params.city + "$", "i")}},
        {"companyInfo.createdAt.year": {$eq: parseInt(req.params.year)}},
        {"companyInfo.createdAt.month": {$eq: parseInt(req.params.month)}}
      ]})
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}));
});

export default router;
