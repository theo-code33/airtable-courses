import { useEffect, useState } from "react";
import "./App.css";
import { Clients } from "./utils/types/client";
import Chip from "./components/Chip/Chip";
import ClientForm from "./components/ClientForm/ClientForm";
import { getClients } from "./utils/airtable";

function App() {
  const [clients, setClients] = useState<Clients>([]);

  useEffect(() => {
    getClients(setClients);
  }, []);

  return (
    <div>
      Hello Airtable application
      <ul>
        {clients.map((client) => (
          <li key={client.id}>
            ID : {client.id} - {client.firstname} {client.lastname} -{" "}
            {client.email} - {client.phoneNumber} -{" "}
            <Chip status={client.status} />
          </li>
        ))}
      </ul>
      <ClientForm setClients={setClients} />
    </div>
  );
}

export default App;
