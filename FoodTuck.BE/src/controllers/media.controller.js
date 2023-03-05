const catchAsync = require('../utils/catchAsync');
const { readFileSync } = require('fs');
const { join } = require('path');
const qs = require('querystring');
const fs = require('fs');
const path = require('path');
const { getBoundary, parseMultipartData } = require('../utils/parse-multipart-data');
const crypto = require('crypto');
const busboy = require('busboy');

const upload = catchAsync(async (req, res) => {
  let filePath = '';
  const bb = busboy({ headers: req.headers });
  bb.on('file', (name, file, info) => {
    const filename = info.filename;
    filePath = join(__dirname, `../../media/${filename}`);
    while(fs.existsSync(filePath)) {
      const parsedFilePath = path.parse(filePath);
      const randomInt = crypto.randomInt(1000000);
      filePath = `${parsedFilePath.dir}/${parsedFilePath.name}(${randomInt})${parsedFilePath.ext}`
    }

    file.pipe(fs.createWriteStream(filePath));
  });
  bb.on('close', () => {
    res.send({fileUrl: `/media/${path.parse(filePath).base}`})
  });
  req.pipe(bb);
});

const deleteFile = catchAsync(async (req, res) => {
  console.log(req.body);
});

module.exports = {
  upload,
  delete: deleteFile,
};
