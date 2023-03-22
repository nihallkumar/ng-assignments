const express = require('express')
const cors = require('cors')
const connectToMongo = require('./db')
const auth = require('./routes/auth');

connectToMongo() 

const app = express()
const port = 3000
 
app.use(cors()) 
app.use(express.json());
 
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/auth/', auth);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})