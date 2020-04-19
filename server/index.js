const path = require('path');
const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({entended: true}));

app.use(express.static(path.join(__dirname, '../public')))

app.use('/api', require('./api'));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../public/index.html'))
})

app.use(function (err, req, res, next) {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});

const port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
