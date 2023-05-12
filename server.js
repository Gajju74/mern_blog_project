const express = require('express')
const app = express()
const mongoDB = require("./db")
const cors = require("cors");
mongoDB();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8000



app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));



app.get('/', function(req, res) {
  res.send('hello world')
})


app.use(cors());
app.use(express.json());
app.use('/api', require('./Routes/CreateBlog'))


app.listen(PORT, function(req, res) {
  console.log(`Server start at port no ${PORT}`);
});