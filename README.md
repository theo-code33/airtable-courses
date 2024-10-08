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

- Create a new file called `getClients.ts` in the `utils/airtable` folder
- Add the following code to the `getClients.ts` file:

```typescript
import { FieldSet } from "airtable";
import connectAirtable from "./connection";

const getClients = () => {
  const base = connectAirtable();
  const table = base("Table 1");
  const data: FieldSet[] = [];
  table
    .select({
      view: "Grid view",
    })
    .eachPage(
      function page(records, fetchNextPage) {
        for (const record of records) {
          data.push(record.fields);
        }
        fetchNextPage();
      },
      function done(err) {
        if (err) {
          console.error(err);
          return;
        }
      }
    );

  return data;
};

export default getClients;
```

- Import the `getClients` function in the `index.tsx` file
- Use the `getClients` function to get the data from Airtable in the `App.tsx` file

```typescript
useEffect(() => {
  (async () => {
    const clients = await getClients();
    console.log("clients =>", clients);
  })();
}, []);
```
