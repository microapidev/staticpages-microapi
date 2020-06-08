const fileModel = require('../models/file.model');



/**
 * Controllers for :
 * 
 * getFiles
 * getFile,
 * createFile,
 * updateFile,
 * deleteFile
 */

class FileContoller {
    async getFile(req, res) {
        const { _id } = req.params;
        const fileInfo = await fileModel.findOne({ id }, (err, info) => {
            if (err) return res.json({ message: 'there is an error in retrieving the file' }).status(400);
            res.json({
                data: info,
                message: 'The file is successfully retrieved'
            }).status(200);
        })
    }

}

module.exports = new FileContoller();
