const Grid = require('gridfs-stream');
const mime = require('mime');
const mongoose = require('mongoose');


const path = process.env.DB_URL;
const dbConnection = mongoose.createConnection(path);

const gfs = new Grid(dbConnection.db);

/*
gfs.collection("photos.chunks").find(
    {_id: ObjectId("5eb1d8fe3ac90d25b8617525")}
)
*/

// then once you get the id of the file you want:
const id = ObjectId("5eb1d8fe3ac90d25b8617525");
console.log(id);

gfs.findOne({
  _id: id
}, (err, file) => {
  if (err) {
    // report the error
  } else {
    // detect the content type and set the appropriate response headers.
    let mimeType = file.contentType;
    if (!mimeType) {
      mimeType = mime.lookup(file.filename);
    }
    res.set({
      'Content-Type': mimeType,
      'Content-Disposition': 'attachment; filename=' + file.filename
    });

    const readStream = gfs.createReadStream({
      _id: id
    });
    readStream.on('error', err => {
      // report stream error
    });
    // the response will be the file itself.
    readStream.pipe(res);
  }
});