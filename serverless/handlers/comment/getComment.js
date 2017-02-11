'use strict';

const fs = require("fs");
const uuid = require('uuid');
const axios = require('axios');

const uploadToS3 = require('./s3Upload');
const ep = require('../eventParser');

module.exports.getComment = (event, context, callback) => {

  const commentEndpoint = 'https://jsonplaceholder.typicode.com/comments';
  const commentId = ep.parseEvent(event).id;

  if (!commentId) return callback(new Error(`Couldn't get comment, there is no id!`), null);

  axios.get(`${commentEndpoint}/${commentId}`)
      .then((response) => {
        const res = JSON.stringify(response.data);
        const fileName = `${uuid.v1()}.json`;
        const tmpFile = `/tmp/${fileName}`;

        fs.writeFile(tmpFile, res, 'utf8', (err) => {
          if (err) throw new Error(`Not able to write file!`);
          uploadToS3.saveFileToS3(tmpFile, fileName, callback);
        });

      })
      .catch((e) => {
        callback(e, null);
        throw new Error(`Couldn't get comment. Something wrong! ${e}`);
      });
};