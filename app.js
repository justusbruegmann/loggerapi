const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

app.get('/', (req, res) => {
  res.status(200).send('This is the logger api for my own Logging needs');
})

app.listen(process.env.PORT, () => {
    console.log('Server is running on port ' + process.env.PORT);
});