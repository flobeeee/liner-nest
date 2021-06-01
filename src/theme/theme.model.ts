import { Column, Model, Table, HasMany } from 'sequelize-typescript';
import { Highlight } from 'src/highlight/highlight.model';

@Table
export class Theme extends Model {
  @Column
  theme: number;

  @Column
  colorHex: string;

  @HasMany(() => Highlight)
  highlights: Highlight[];
}
