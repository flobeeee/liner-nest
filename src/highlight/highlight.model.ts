import {
  Column,
  Model,
  Table,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { Page } from 'src/page/page.model';
import { Theme } from 'src/theme/theme.model';
import { User } from 'src/user/user.model';

@Table
export class Highlight extends Model<Highlight> {
  @ForeignKey(() => User)
  userId: number;

  @ForeignKey(() => Page)
  pageId: number;

  @Column
  text: string;

  @ForeignKey(() => Theme)
  colorId: number;
}
