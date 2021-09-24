import { Column, Model, Table, DataType, CreatedAt, UpdatedAt } from 'sequelize-typescript';



@Table
export class Wallet extends Model<Wallet> {
  @Column({
      type: DataType.INTEGER,
      autoIncrement: true,
      unique: true,
      primaryKey: true,
  })
  public id: number
  


  @Column({
      unique: true,
  })
  address: string;

  @Column
  balance: string;

  @Column
  old: boolean;

  @Column
  favorite: boolean;

  @CreatedAt public createdAt: Date;

  @UpdatedAt public updatedAt: Date;
}