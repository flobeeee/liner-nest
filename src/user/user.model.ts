import { Column, Model, Table, HasMany } from 'sequelize-typescript';
import { Highlight } from 'src/highlight/highlight.model';

@Table
export class User extends Model<User> {
  @Column
  userId: string;

  @Column
  theme: number;

  @HasMany(() => Highlight)
  highlights: Highlight[];
}
