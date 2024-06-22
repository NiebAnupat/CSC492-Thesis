const { Pool } = require('pg');
const { readFileSync } = require('fs');
const dotenv = require('dotenv');
dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const dropSchema = () => {
  const dropSchemaSql = readFileSync("./src/migrations/drop_schema.sql").toString();
  return pool.query(dropSchemaSql)
    .then(() => console.log("Schema dropped successfully"))
    .catch(error => console.log("Migration failed\n", error));
};

const initTables = () => {
  const initTablesSql = readFileSync("./src/migrations/init_tables.sql").toString();
  return pool.query(initTablesSql)
    .then(() => console.log("Tables created successfully"))
    .catch(error => console.log("Tables create failed\n", error));
};

const customerSeedForTest = () => {
  const seedSql = readFileSync("./src/migrations/customer_seed.sql").toString();
  return pool.query(seedSql)
    .then(() => console.log("Seed customer for test completed successfully"))
    .catch(error => console.log("Seed customer for test failed\n", error));
};

const findAllCustomer = () => {
  const findAllSql = 'SELECT * FROM customer';
  return pool.query(findAllSql)
    .then(result => {
      console.log("Test find all customer completed successfully");
      console.log(result.rows);
    })
    .catch(error => console.log("Test find all customer failed\n", error));
};

// Execute functions sequentially and close pool
(async () => {
  try {
    await dropSchema();
    await initTables();
    await customerSeedForTest();
    await findAllCustomer();  
    console.log("Migration completed successfully");
  } finally {
    pool.end();
  }
})();
