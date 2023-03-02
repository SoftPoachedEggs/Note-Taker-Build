const express = require('express');
const app = express()
const PORT = process.env.PORT || 3003;

//middleware for the Express.js framework. 
app.use(express.urlencoded({ extended: true }));
//enablees parsing of incomming requests with a JSON payload 
app.use(express.json());
app.use(express.static('public'));


const htmlRouter = require('./routes/htmlRoutes')
const apiRoutes = require('./routes/apiRoutes')

//midleware that handles incoming requests for the root path 'htmlRouter'
//middleware function that handles any incoming requests for the apiRoutes. 
app.use('/api', apiRoutes);
app.use('/', htmlRouter);

//listen method is used to start the express application and make it listen on a specific port. 
app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`)
});