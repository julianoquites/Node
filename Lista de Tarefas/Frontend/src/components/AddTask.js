import { useState } from "react";

const AddTask = ({ onAdd }) => {
  const [tarefa, setTarefa] = useState("");
  const [local, setLocal] = useState("");
  const [data, setData] = useState("");
  const [lembrete, setLembrete] = useState(false);

  const onSubmit = () => {

    if (!tarefa) {
      alert("Por favor, adicione uma Tarefa.");
      return;
    }

    onAdd({ tarefa, local, data, lembrete });
    setTarefa("");
    setLocal("");
    setData("");
    setLembrete(false);
  };

  return (
    <form className="add-form" onSubmit={onSubmit}>
      <div className="form-control">
        <label>Tarefa</label>
        <input
          type="text"
          placeholder="Adicionar Tarefa"
          value={tarefa}
          onChange={(e) => setTarefa(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label>Local</label>
        <input
          type="text"
          placeholder="Adicionar local"
          value={local}
          onChange={(e) => setLocal(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label>Data</label>
        <input
          type="text"
          placeholder="Adicionar dia e horário"
          value={data}
          onChange={(e) => setData(e.target.value)}
        />
      </div>
      <div className="form-control form-control-check">
        <label>Definir Lembrete</label>
        <input
          type="checkbox"
          checked={lembrete}
          value={lembrete}
          onChange={(e) => setLembrete(e.currentTarget.checked)}
        />
      </div>

      <input className="btn btn-block" type="submit" value="Salvar Tarefa" />
    </form>
  );
};

export default AddTask;
