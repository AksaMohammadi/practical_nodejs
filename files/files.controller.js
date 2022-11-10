const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const fileService = require('./file.service');
var path = require('path');
var fs = require("fs");
var multer = require('multer')

// handle storage using multer
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
       cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
       cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
 });
  
 var upload = multer({ storage: storage });

// routes

router.get('/', getAllFiles);
router.get('/:id', getFileById);
router.post('/',upload.single('dataFile'), createFile);
router.put('/:id',upload.single('dataFile'), updateFile);
router.delete('/:id', _deleteFile);

module.exports = router;

// route functions


function getAllFiles(req, res, next) {
    fileService.getAllFiles()
        .then(files => res.json(files))
        .catch(next);
}

function getFileById(req, res, next) {
    fileService.getFileById(req.params.id)
        .then(file => res.json(file))
        .catch(next);
}

function createFile(req, res, next) {
    console.log("🚀 ~ file: files.controller.js ~ line 46 ~ createFile ~ req")
    const file = req.file;
    console.log("🚀 ~ file: files.controller.js ~ line 47 ~ createFile ~ file", file)
    if (!file) {
       return res.status(400).send({ message: 'Please upload a file.' });
    }else{
        var fileUploadsPath = 'uploads/'+req.file.filename;
        // ------------------------------------
        const promise = fs.promises.readFile(path.join(fileUploadsPath));
        var reqBody = {
            file_name: req.file.originalname,
            file_size: req.file.size,
            file_type: req.file.mimetype
        }
        Promise.resolve(promise).then(function(buffer){
            // reqBody.file = fs.readFileSync(req.file.path);
            reqBody.file = buffer
            // console.log(buffer);
            console.log("🚀 ~ file: files.controller.js ~ line 73 ~ createFile ~ reqBody", reqBody)
            fileService.createFile(reqBody)
            .then(() => res.json({ message: 'File created' }))
            .catch(next);
        });       
        
    }
}

function updateFile(req, res, next) {
    console.log("🚀 ~ file: files.controller.js ~ line 46 ~ createFile ~ req")
    const file = req.file;
    console.log("🚀 ~ file: files.controller.js ~ line 47 ~ createFile ~ file", file)
    if (!file) {
       return res.status(400).send({ message: 'Please upload a file.' });
    }else{
        var fileUploadsPath = 'uploads/'+req.file.filename;
        // ------------------------------------
        const promise = fs.promises.readFile(path.join(fileUploadsPath));
        var reqBody = {
            file_name: req.file.originalname,
            file_size: req.file.size,
            file_type: req.file.mimetype
        }
        Promise.resolve(promise).then(function(buffer){
            // reqBody.file = fs.readFileSync(req.file.path);
            reqBody.file = buffer
            // console.log(buffer);
            console.log("🚀 ~ file: files.controller.js ~ line 73 ~ createFile ~ reqBody", reqBody)
            fileService.updateFile(req.params.id,reqBody)
            .then(() => res.json({ message: 'File updated' }))
            .catch(next);
        })
    }
}

function _deleteFile(req, res, next) {
    fileService.deleteFile(req.params.id)
        .then(() => res.json({ message: 'File deleted' }))
        .catch(next);
}

