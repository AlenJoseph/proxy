/**
 * @fileoverview Route for FileUpload and File Retrival
 *
 * @author Alen Joseph
 */

const express = require('express');
const router = express.Router();

// Load Upload Controller
const controller = require('../../controllers/user');

// @route   Get Home Page
// @desc     Get Home Page
// @Input   File, Extention
// @Output  Content Hash
// @access  Public
router.get('/', controller.default);

// @route   POST /login
// @desc    Login user 
// @Input   Username and Password
// @Output  File
// @access  Public
router.post('/login', controller.login);

module.exports = router;
