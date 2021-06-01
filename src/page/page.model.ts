import { Column, Model, Table, HasMany } from 'sequelize-typescript';
import { Highlight } from 'src/highlight/highlight.model';

@Table
export class Page extends Model<Page> {
  @Column
  pageUrl: string;

  @HasMany(() => Highlight)
  highlights: Highlight[];
}
