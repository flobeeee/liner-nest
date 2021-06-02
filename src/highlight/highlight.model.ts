import {
  Column,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Page } from 'src/page/page.model';
import { Theme } from 'src/theme/theme.model';
import { User } from 'src/user/user.model';

@Table
export class Highlight extends Model {
  @ForeignKey(() => User)
  userId: number;

  @ForeignKey(() => Page)
  pageId: number;

  @Column
  text: string;

  @BelongsTo(() => Theme)
  themeData: number;

  @ForeignKey(() => Theme)
  colorId: number;
}
