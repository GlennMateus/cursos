import React, { useEffect, useState } from "react";
import api from "./services/api";

import DevItem from "./components/DevItem";
import DevForm from "./components/DevForm";

import "./global.css";
import "./App.css";
import "./Main.css";

function App() {
  const [devs, setDevs] = useState([]);

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get("/devs");

      setDevs(response.data);
    }

    loadDevs();
  }, [devs]);

  async function handleAddDev(data) {
    await api.post("/devs", data);
  }

  async function handleUpdateUser(data) {
    const { id, op } = data;
    if (op === "delete") {
      await api.delete(`/devs/${id}`);
    } else if (op === "activate") {
      await api.put(`/devs/${id}`, { dev_status: true, data: {} });
    } else if (op === "update") {
      await api.put(`/devs/${id}`, { data });
    }
  }
  return (
    <div id='app'>
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev} />
      </aside>
      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev} onChange={handleUpdateUser} />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
