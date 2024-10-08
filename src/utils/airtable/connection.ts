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
