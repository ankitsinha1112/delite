const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors') 

connectToMongo();

const app = express()
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())

//available ports
app.get("/", (_req, res) => {
  res.send({ message: "Hello from Api." });
});

app.use('/api',require('./routes/auth'))

app.listen(port, () => {
  console.log(`My app listening at http://localhost:${port}`);
})