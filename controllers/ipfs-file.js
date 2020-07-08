/**
 * @fileoverview Controller for FileUpload and File Retrival
 *
 * @author Alen Joseph
 */

const ipfsCluster = require('ipfs-cluster-api');
const fs = require('fs');
const path = require('path');
const write = require('fs-writefile-promise');
// connect to ipfs daemon API server
const cluster = ipfsCluster('localhost', '9094', { protocol: 'http' });
const ipfsClient = require('ipfs-http-client');
// connect to ipfs daemon API server
const ipfs = ipfsClient({ host: 'localhost', port: '5001', protocol: 'http' });
// @controller   POST /api/ipfs-file/upload
// @desc    Add file to IPFS
// @Input   File, Extention
// @Output  Content Hash
// @access  Public
exports.upload = async (req, res, next) => {
  try {
    const file_name = req.body.filename;
    const ext = req.body.ext;
    const content = req.body.content;
    const file = {
      path: '/tmp/' + file_name + '.' + ext,
      content: content,
    };

    for await (const result of ipfs.add(file)) {
      let data = result.cid.toString();
      if (data) {
        res.status(200).json({ cid: data });
        break;
      }
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err });
  }
};

// @controller   POST /api/ipfs-file/check
// @desc    Check file is present in IPFS
// @Input   Content Hash
// @Output  File
// @access  Public
exports.check = async (req, res, next) => {
  try {
    const validCID = req.body.cid; //'QmR7mD19se6Z9GMWJs7KHcJ6CWKHP31wG7vYZXEjE33zHX';
    const content = req.body.content;
    for await (const result of ipfs.get(validCID)) {
      for await (data of result.content) {
        if (content == data.toString()) {
          res.status(200).json({ status: true });
        } else {
          res.status(404).json({ status: false });
        }
      }
    }
  } catch (err) {
    res.status(400).json({ error: err });
  }
};
