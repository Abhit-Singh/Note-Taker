const express = require("express");
const apiRoutes = require('./routes/api');
const htmlRoutes = require('./routes/index');

// Express init
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended:true }));

// Middleware to serve static files from public
app.use(express.static('public'));

// Routes
app.use('/api', apiRoutes);
app.use('/',htmlRoutes);

// Run App
app.listen(PORT, ()=> console.log(`listening on PORT: ${PORT}`));