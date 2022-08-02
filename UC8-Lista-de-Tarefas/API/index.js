const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const port = 3000
const cors = require("cors");

app.use(cors());


app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended:true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API'})
})

app.get('/todos', db.getTasks);
app.get("/todos/:id", db.getTasksbyId);
app.post('/todos', db.createTask)
app.put('/todos/:id', db.updateTask)
app.delete('/todos/:id', db.deleteTask)

app.listen(port, () => {
  console.log(`APP running on port ${port}.`)
})