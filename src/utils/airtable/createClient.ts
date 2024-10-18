import { Client, ClientDto, Clients, Status } from "../types/client";
import connectAirtable from "./connect";

const createClient = (
  clientDto: ClientDto,
  setClients: React.Dispatch<React.SetStateAction<Clients>>
) => {
  const base = connectAirtable();
  const TABLE_NAME = "Table 1";
  const table = base(TABLE_NAME);

  const newClient = {
    fields: {
      ...clientDto,
      status: Status.NOT_CONTACTED,
    },
  };

  table.create([newClient], (error, records) => {
    if (error) {
      console.error(error);
    }
    if (!records) {
      return;
    }
    for (const record of records) {
      setClients((previousClients) => {
        return [
          ...previousClients,
          {
            id: record.id,
            ...record.fields,
          } as Client,
        ];
      });
    }
  });
};

export default createClient;
