import Airtable from "airtable";

const connectAirtable = () => {
  if (!import.meta.env.VITE_APP_AIRTABLE_API_TOKEN) {
    throw new Error("Airtable API token is missing.");
  }
  Airtable.configure({
    apiKey: import.meta.env.VITE_APP_AIRTABLE_API_TOKEN,
  });
  if (!import.meta.env.VITE_APP_AIRTABLE_BASE_ID) {
    throw new Error("Airtable base ID is missing.");
  }
  const base = Airtable.base(import.meta.env.VITE_APP_AIRTABLE_BASE_ID);

  console.log("Connected to Airtable");

  return base;
};

export default connectAirtable;
