import Movie from '@modules/movies/infra/typeorm/entities/Movies';
import * as fs from 'fs';
import * as path from 'path';
import { DataSource } from 'typeorm';

const databasePath = path.resolve(
  __dirname,
  './data/sqlite/compacine.sqlite',
);

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
  entities: [Movie],
  migrations: ['./src/shared/infra/typeorm/migrations/*.ts'],
  synchronize: false,
});
