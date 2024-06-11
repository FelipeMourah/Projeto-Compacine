import Movie from '@modules/movies/infra/typeorm/entities/Movies';
import { Session } from '@modules/sessions/infra/typeorm/entities/Sessions';
import { Ticket } from '@modules/tickets/infra/typeorm/entities/Tickets';

import * as fs from 'fs';

import * as path from 'path';
import { DataSource } from 'typeorm';

const databasePath = path.resolve(__dirname, './data/sqlite/compacine.sqlite');

const databaseDir = path.dirname(databasePath);

function ensureDirectoryExistence(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

ensureDirectoryExistence(databaseDir);

export const dataSource = new DataSource({
  type: 'sqlite',
  database: databasePath,
  entities: [Movie, Session, Ticket],
  migrations: ['./src/shared/infra/typeorm/migrations/*.ts'],
  synchronize: false,
});
