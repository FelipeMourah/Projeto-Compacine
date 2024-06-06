import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class ChangeSessionFieldTypes1622869910278
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'sessions',
      'day',
      new TableColumn({
        name: 'day',
        type: 'date',
        isNullable: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'sessions',
      'day',
      new TableColumn({
        name: 'day',
        type: 'varchar',
        isNullable: false,
      }),
    );
  }
}
