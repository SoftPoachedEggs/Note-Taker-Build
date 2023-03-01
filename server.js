const express = require('express');
const app = express()
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const htmlRouter = require('./routes/htmlRoutes')
const apiRoutes = require('./routes/apiRoutes')


app.use('/', htmlRouter)
app.use('/api', apiRoutes)


app.listen(PORT, () => console.log(`App listening on port ${PORT}`));