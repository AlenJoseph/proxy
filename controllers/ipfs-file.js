// @controller   POST /api/ipfs-file/upload
// @desc    Add file to IPFS
// @Input   File, Extention
// @Output  Content Hash
// @access  Public
exports.upload = (req, res, next) => {
  res.send(req.body.data);
};

// @route   GET /api/ipfs-file/retrive
// @desc    Add file to IPFS
// @Input   Content Hash
// @Output  File
// @access  Public
exports.retrive = (req, res, next) => {
  res.send({ msg: req.query.id });
};
