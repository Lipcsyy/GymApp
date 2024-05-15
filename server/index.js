const express = require('express');
const app = express();
const cors = require('cors');

const workoutRouter = require('./routes/workout')
app.use(cors());
app.use('/workout', workoutRouter);

app.listen(3001, () => {

})