# Airtable Courses

This project is a simple React application that uses Airtable as a backend to store and retrieve data.

## Prerequisites

- Node.js
- Yarn
- Airtable account

## Technologies used:

## Getting Started

### Create a new react project

```bash
yarn create vite airtable-courses --template react-ts # This will create a new react project with typescript

cd airtable-courses # Change to the project directory

code . # Open the project in Visual Studio Code
```

### Install the dependencies

```bash
yarn
yarn add airtable
```

### Create a new Airtable base

- Go to [Airtable](https://airtable.com/) and create a new account
- Create a new base called `Clients`
- Add a table with the following fields:
  - firstname (Single line text)
  - lastname (Long text)
  - email (Email)
  - phoneNumber (Phone number)
  - notes (Long text)
  - status (Single select: Contacted, Not Contacted, Contact in Future)
- Add some data to the table

### Create a new Airtable API key

- Go to [Airtable API](https://airtable.com/developers/web/api/introduction)
- Click on the _**Client base**_
- Follow the instructions to create a new API token
- Copy the API token
- Create a new `.env` file in the root of the project and add the following:

```env
VITE_APP_AIRTABLE_API_TOKEN=YOUR_TOKEN
VITE_APP_AIRTABLE_BASE_ID=YOUR_BASE_ID
```

### Create a Airtable service

- Create a new folder called `utils` in the `src` folder
- Create a new folder called `airtable` in the `utils` folder
- Create new files called `connection.ts` and `index.ts` in the `airtable` folder
- Add the following code to the `connection.ts` file:

```typescript
import Airtable from "airtable";

const connectAirtable = () => {
  if (!import.meta.env.VITE_APP_AIRTABLE_API_TOKEN) {
    throw new Error("AIRTABLE_API_KEY is not set");
  }
  Airtable.configure({
    apiKey: import.meta.env.VITE_APP_AIRTABLE_API_TOKEN,
  });

  if (!import.meta.env.VITE_APP_AIRTABLE_BASE_ID) {
    throw new Error("AIRTABLE_BASE_ID is not set");
  }
  const airtableBase = Airtable.base(import.meta.env.VITE_APP_AIRTABLE_BASE_ID);

  console.log("Connected to Airtable");

  return airtableBase;
};

export default connectAirtable;
```

- Add the following code to the `index.ts` file:

```typescript
import connectAirtable from "./connection";

export { connectAirtable };
```

- Import the `connectAirtable` function in the `App.tsx` file

```typescript
connectAirtable();
```

- Create a new folder called `types` in the `utils` folder
- Create a new file called `client.ts` in the `types` folder
- Add the following code to the `client.ts` file:

```typescript
export enum Status {
  CONTACTED = "Contacted",
  NOT_CONTACTED = "Not contacted",
  CONTACT_IN_FUTURE = "Contact in future",
}

export type Client = {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  phoneNumber: string;
  notes: string;
  status: Status;
};

export type Clients = Client[];

export type ClientDto = {
  firstname: string;
  lastname: string;
  email: string;
  phoneNumber: string;
};
```

- Create a new file called `getClients.ts` in the `utils/airtable` folder
- Add the following code to the `getClients.ts` file:

```typescript
import connectAirtable from "./connect";
import { Client, Clients } from "../types/client";

const getClients = (
  setClients: React.Dispatch<React.SetStateAction<Clients>>
) => {
  const base = connectAirtable();
  const TABLE_NAME = "Table 1";
  const table = base(TABLE_NAME);

  const GRID_VIEW_NAME = "Grid view";

  table
    .select({
      view: GRID_VIEW_NAME,
    })
    .eachPage(
      (records, fetchNextPage) => {
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
        fetchNextPage();
      },
      (error) => {
        if (error) {
          console.error(error);
        }
      }
    );
};

export default getClients;
```

- Import the `getClients` function in the `index.tsx` file
- Use the `getClients` function to get the data from Airtable in the `App.tsx` file

```typescript
const [clients, setClients] = useState<Clients>([]);

useEffect(() => {
  getClients(setClients);
}, []);
```

- Create a new folder called `components` in the `src` folder
- Create a new file called `Chip.tsx` in the `components` folder
- Add the following code to the `Chip.tsx` file:

```typescript
import { Status } from "../../utils/types/client";

const Chip = ({ status }: { status: Status }) => {
  let style;
  switch (status) {
    case Status.CONTACTED:
      style = {
        backgroundColor: "green",
        color: "white",
      };
      break;
    case Status.NOT_CONTACTED:
      style = {
        backgroundColor: "red",
        color: "white",
      };
      break;
    case Status.CONTACT_IN_FUTURE:
      style = {
        backgroundColor: "blue",
        color: "white",
      };
      break;
    default:
      break;
  }
  return (
    <div
      style={{
        padding: "5px",
        borderRadius: "30px",
        ...style,
      }}
    >
      {status}
    </div>
  );
};

export default Chip;
```

- Add clients list to the `App.tsx` file

```typescript
<ul>
  {clients.map((client) => (
    <li key={client.id}>
      ID : {client.id} - {client.firstname} {client.lastname} - {client.email} -{" "}
      {client.phoneNumber} - <Chip status={client.status} />
    </li>
  ))}
</ul>
```

- Create a new folder called `ClientForm` in the `components` folder
- Create a new file called `ClientForm.tsx` in the `ClientForm` folder
- Add the following code to the `ClientForm.tsx` file:

```typescript
import React, { useState } from "react";
import { ClientDto, Clients } from "../../utils/types/client";
import { createClient } from "../../utils/airtable";

const ClientForm = ({
  setClients,
}: {
  setClients: React.Dispatch<React.SetStateAction<Clients>>;
}) => {
  const [formData, setFormData] = useState<ClientDto>({
    firstname: "",
    lastname: "",
    email: "",
    phoneNumber: "",
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Création du nouveau client");
    createClient(formData, setClients);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    setFormData((previousFormData) => {
      return {
        ...previousFormData,
        [event.target.name]: event.target.value,
      };
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="firstname"
        placeholder="Votre Prénom"
        required
        onChange={handleChange}
        value={formData.firstname}
      />
      <input
        type="text"
        name="lastname"
        placeholder="Votre Nom"
        required
        onChange={handleChange}
        value={formData.lastname}
      />
      <input
        type="email"
        name="email"
        placeholder="Votre Email"
        required
        onChange={handleChange}
        value={formData.email}
      />
      <input
        type="text"
        name="phoneNumber"
        placeholder="Votre Numéro de Téléphone"
        required
        onChange={handleChange}
        value={formData.phoneNumber}
      />
      <button type="submit">Créer le nouveau client</button>
    </form>
  );
};

export default ClientForm;
```
