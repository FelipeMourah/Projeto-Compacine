import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateSession1717631395693 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'sessions',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'movie_id',
            type: 'uuid',
          },
          {
            name: 'room',
            type: 'varchar',
          },
          {
            name: 'capacity',
            type: 'int',
          },
          {
            name: 'day',
            type: 'date',
          },
          {
            name: 'time',
            type: 'varchar',
          },
        ],
        foreignKeys: [
          {
            name: 'MovieId',
            referencedTableName: 'movies',
            referencedColumnNames: ['id'],
            columnNames: ['movie_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('sessions');
  }
}
