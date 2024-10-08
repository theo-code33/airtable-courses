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
