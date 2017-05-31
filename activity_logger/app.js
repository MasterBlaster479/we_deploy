var express = require("express");
var app = express();
var path = require('path');
// serve angular front end files from root path
app.use('/', express.static('app/', { redirect: false }));

// rewrite virtual urls to angular app to enable refreshing of internal pages
// app.get('/*', function (req, res, next) {
//     res.sendFile(path.resolve('app/index.html'));
// });
app.listen(3001, function () {
  console.log('Example app listening on port 3001!')
});