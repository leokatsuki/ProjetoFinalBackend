const express = require('express');
const app = express();
const cors = require('cors');

const clientsRoutes = require('./routes/clientRoutes')
const servicesRoutes = require('./routes/serviceRoutes')

const port = 3334

app.use(cors("http://localhost:3334/clients"))
app.use(express.json())
app.use('/clients', clientsRoutes)
app.use('/services', servicesRoutes)

app.listen(port, ()=>{
  console.log('Server running')
})