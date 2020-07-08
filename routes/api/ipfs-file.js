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

// @controller   POST /api/ipfs-file/check
// @desc    Check file is present in IPFS
// @Input   Content Hash
// @Output  File
// @access  Public
router.post('/check', controller.check);

module.exports = router;
