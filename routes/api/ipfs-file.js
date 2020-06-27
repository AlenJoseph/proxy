/**
 * @fileoverview Route for FileUpload and File Retrival
 *
 * @author Alen Joseph
 */

const express = require('express');
const router = express.Router();

// Load Upload Controller
const controller = require('../../controllers/ipfs-file');

// @route   POST /api/ipfs-file/upload
// @desc    Add file to IPFS
// @Input   File, Extention
// @Output  Content Hash
// @access  Public
router.post('/upload', controller.upload);

// @route   GET /api/ipfs-file/retrive
// @desc    Add file to IPFS
// @Input   Content Hash
// @Output  File
// @access  Public
router.get('/retrive', controller.retrive);

module.exports = router;
