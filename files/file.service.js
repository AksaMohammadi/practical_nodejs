const db = require('_helpers/db');

module.exports = {
    getAllFiles,
    getFileById,
    createFile,
    updateFile,
    deleteFile: _deleteFile
};

async function getAllFiles() {
    return await db.File.findAll();
}

async function getFileById(id) {
    return await getFile(id);
}

async function createFile(params) {

    
    const file = new db.File(params);


    // save file
    await file.save();
}

async function updateFile(id, params) {
    const file = await getFile(id);

    // copy params to file and save
    Object.assign(file, params);
    await file.save();
}

async function _deleteFile(id) {
    const file = await getFile(id);
    await file.destroy();
}

// helper functions

async function getFile(id) {
    const file = await db.File.findByPk(id);
    if (!file) throw 'File not found';
    return file;
}