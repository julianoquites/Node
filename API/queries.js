const Pool = require("pg").Pool;
const pool = new Pool({
  user: "me",
  host: "localhost",
  database: "api",
  password: "",
  port: 5432,
});

const getTasks = (request, response) => {
  pool.query("SELECT * FROM todos ORDER BY id ASC", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getTasksbyId = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query("SELECT * FROM todos WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const createTask = (request, response) => {
  const { tarefas, local, data, concluido } = request.body;
  pool.query(
    "INSERT INTO todos (tarefas, local, data, concluido) VALUES ($1, $2, $3, $4) RETURNING *",
    [tarefas, local, data, concluido],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Task added with ID: ${results.rows[0].id}`);
    }
  );
};

const updateTask = (request, response) => {
  const id = parseInt(request.params.id);
  const { tarefas, local, data, concluido } = request.body;

  pool.query(
    "UPDATE todos SET tarefas = $1, local = $2, data = $3, concluido = $4 WHERE id = $3",
    [tarefas, local, data, concluido],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Task modified with ID: ${id}`);
    }
  );
};

const deleteTask = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query("DELETE FROM todos WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`User deleted with ID: ${id}`);
  });
};

module.exports = {
  getTasks,
  getTasksbyId,
  createTask,
  updateTask,
  deleteTask,
};
