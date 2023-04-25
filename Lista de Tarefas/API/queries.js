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
  const { tarefa, local, data, lembrete } = request.body;
  pool.query(
    "INSERT INTO todos (tarefa, local, data, lembrete) VALUES ($1, $2, $3, $4) RETURNING *",
    [tarefa, local, data, lembrete],
    (error, results) => {
      if (error) {
        throw error;
      }
    }
  );
};

const updateTask = (request, response) => {
  const id = parseInt(request.params.id);
  const { lembrete } = request.body;

  pool.query(
    "UPDATE todos SET lembrete = $1 WHERE id = $2",
    [lembrete, id],
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
