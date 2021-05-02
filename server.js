var express = require('express')
var app = express();
app.use(express.static ('./dist/employee-management'));
app.get('/*', function (req, res) {
  res.sendFile ('index.html', {root: 'dist/employee-management/'}
  );
});

app.listen(process.env.PORT || 8091);
