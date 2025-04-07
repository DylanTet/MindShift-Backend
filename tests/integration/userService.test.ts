import { Client } from "pg";
import { PostgreSqlContainer, StartedPostgreSqlContainer } from '@testcontainers/postgresql'
import { createCustomerTable, createNewUserInDB, getCustomerFromDB } from "../../src/db";

describe("Customer Database", () => {
  jest.setTimeout(60000);

  let postgresContainer: StartedPostgreSqlContainer;
  let postgresClient: Client;

  beforeAll(async () => {
    postgresContainer = await new PostgreSqlContainer().start();
    postgresClient = new Client({ connectionString: postgresContainer.getConnectionUri() });
    await postgresClient.connect();
    createCustomerTable(postgresClient);
  });

  afterAll(async () => {
    await postgresClient.end();
    await postgresContainer.stop();
  });

  it("should create and return a new customer", async () => {
    const customerData = { name: "Dylan", email: "abs@gmail.com", id: 1 };
    await createNewUserInDB(customerData, postgresClient);
    const customers = await getCustomerFromDB(1, postgresClient);
    expect(customers).toEqual(customerData)
  });
});
