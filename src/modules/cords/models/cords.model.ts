import {
  AutoIncrement,
  Column,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

@Table
export class CordsModel extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column('float')
  x: number;

  @Column('float')
  y: number;

  @Column('float')
  r: number;

  @Column
  userId: number;

  @Column
  isHit: boolean;

  @Column
  date: string;
}
