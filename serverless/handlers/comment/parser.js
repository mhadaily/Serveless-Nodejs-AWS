'use strict';
const AWS = require('aws-sdk');
const cloudwatch = new AWS.CloudWatch({apiVersion: '2017-02-10'});
const s3 = new AWS.S3();

module.exports.commentParser = (event, context, callback) => {
  event = event.Records[0];

  const s3Params = {
    Bucket: event.s3.bucket.name,
    Key: event.s3.object.key
  };

  //let's promisify
  const ReadFile = new Promise((resolve, reject) => {
    s3.getObject(s3Params, (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });

  ReadFile.then((data) => {

    let utfData = data.Body.toString('utf-8');

    //Show in logs CloudWatch logs
    console.log('HAS BEEN READ FROM S3: ', utfData);

    //return call backs with file\'s content
    callback(null, utfData);

    //Extra info as Metrics
    const cloudWatchparams = {
      MetricData: [{
        MetricName: event.eventName,
        Timestamp: new Date,
        Unit: event.s3.object.size,
        Value: event.s3.object.size
      }],
      Namespace: 'BrandLabCustomS3Metrics' /* required */
    };
    //put metrics in cloudWatch
    cloudwatch.putMetricData(cloudWatchparams, (err, data) => {
      if (err) throw new Error(err + err.stack);
      console.log(data);
    });

  }).catch((e) => {
    callback(e, null);
  });

};