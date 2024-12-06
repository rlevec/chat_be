import { tables } from "../tables/index.js";
import { formData } from "../data/index.js";
import { indexes } from "../indexes/index.js";
import { handleThrowNewErrorAction } from "../../../utils/index.js";

// Function to validate table names
const validateTableName = (name) => {
  if (!/^[a-zA-Z0-9_]+$/.test(name)) {
    handleThrowNewErrorAction(400, `Invalid table name: ${name}`)
  }
};

// Function to check if a table exists
const checkIfTableExists = async (client, name) => {
  const checkIfTableExistsQuery = `
    SELECT EXISTS (
      SELECT 1
      FROM information_schema.tables
      WHERE table_name = $1
    );
  `;
  const { rows } = await client.query(checkIfTableExistsQuery, [name]);
  return rows[0].exists;
};

// Function to create a table
const createTable = async (client, name, model) => {
  const createTableQuery = `CREATE TABLE ${name} (${model});`;
  await client.query(createTableQuery);

};

// Function to create indexes for a table
const createIndexes = async (client, name) => {
  if (indexes[name]) {
    const indexCreationPromises = indexes[name].map(query => client.query(query));
    await Promise.all(indexCreationPromises);
    console.log(`All indexes created or already exist on ${name} table.`);
  } else {
    console.log(`No indexes defined for the table: ${name}`);
  }
};

// Function to insert form data into the "form_data" table
const insertFormData = async (client, name) => {
  const insertQuery = `
    INSERT INTO ${name} (key, content) 
    VALUES ($1, $2) 
    ON CONFLICT (key) DO NOTHING;
  `;
  
  const formDataInsertPromises = formData?.map(async (form) => {
    const { key, content } = form;
    await client.query(insertQuery, [key, content]);
  });

  await Promise.all(formDataInsertPromises);

};

// Main function to check and create tables
export const handleCheckAndCreateTablesAction = async (client) => {
  const tableExistenceCheckPromises = tables?.map(async (table) => {
    const { name, model } = table;

    try {
      validateTableName(name);

      const tableExists = await checkIfTableExists(client, name);
      
      if (!tableExists) {
        console.log(`${name} does not exist. Creating the table...`);
        await createTable(client, name, model);
        await createIndexes(client, name);

        if (name === "form_data") {
          await insertFormData(client, name);
        }
      } else {
        console.log(`${name} table already exists.`);
      }
    } catch (err) {
      handleThrowNewErrorAction(500, `Error checking or creating table ${name}: ${err.message}`);
    }
  });

  const results = await Promise.allSettled(tableExistenceCheckPromises);
  const rejectedPromises = results.filter((result) => result.status === "rejected");

  if (rejectedPromises.length > 0) {
    const errors = rejectedPromises
      .map((result) => result.reason.message)
      .join(", ");
    handleThrowNewErrorAction(500, `Failed to check or create some tables: ${errors}`);
  }
};
