import { createConnection, getConnectionOptions, Connection } from 'typeorm';

export default async (): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  // return createConnection(defaultOptions); // if your docker-compose version is <= 1.28

  return createConnection(
    Object.assign(defaultOptions, {
      host: 'database_yapmt', // This option must be EXACTLY the name given to the database service.
    })
  );
};
