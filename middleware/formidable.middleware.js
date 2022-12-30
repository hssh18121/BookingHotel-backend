const formidable = require("formidable");
module.exports = (req, res, next) => {
  const form = new formidable.IncomingForm();
  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }
    // console.log(fields, files);
    req.files = files;
    req.body = fields;
    next();
  });
};
