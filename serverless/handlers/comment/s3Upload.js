'use strict';

//Let's stick on promise based modules.
const fs = require('fs');
const AWS = require('aws-sdk');

const s3 = new AWS.S3({apiVersion: '2017-02-10'});

module.exports.saveFileToS3 = function (lambdaLocalFile, fileName, prefix, callback) {

  //Read Async and send buffer data in callback in order to upload to s3
  fs.readFile(lambdaLocalFile, (err, data) => {
    if (err) throw err;

    const param = {
      Bucket: process.env.BUCKET,
      Key: `${prefix}/${fileName}`,
      Body: data.toString('utf-8')
    };

    //Upload to S3
    s3.upload(param, (err, data) => {

      // we don't need that anymore let's remove it.
      fs.unlink(lambdaLocalFile, (err) => {
        if (err) console.error(err);
        console.log('Temp File Delete');
      });

      if (err) throw new Error('Something Wrong while uploading ' + err);

      callback(null, 'Successfully uploaded data to S3');
    });

  });

};