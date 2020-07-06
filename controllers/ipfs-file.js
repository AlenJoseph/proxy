/**
 * @fileoverview Controller for FileUpload and File Retrival
 *
 * @author Alen Joseph
 */

const ipfsCluster = require('ipfs-cluster-api');

// connect to ipfs daemon API server
const cluster = ipfsCluster('localhost', '9094', { protocol: 'http' });

// @controller   POST /api/ipfs-file/upload
// @desc    Add file to IPFS
// @Input   File, Extention
// @Output  Content Hash
// @access  Public
exports.upload = (req, res, next) => {
  res.send(req.body.data);
};

// @controller   GET /api/ipfs-file/retrive
// @desc    Add file to IPFS
// @Input   Content Hash
// @Output  File
// @access  Public
exports.retrive = (req, res, next) => {
  cluster.health.graph((err, health) => {
    err ? console.error(err) : console.log(health);
  });
  res.send({ msg: req.query.id });
};
