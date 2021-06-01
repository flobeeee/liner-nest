import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Theme } from './theme.model';

@Module({
  imports: [SequelizeModule.forFeature([Theme])],
  // export it to use it outside this module
  exports: [SequelizeModule],
})
export class ThemeModule {}
