import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Highlight } from './highlight.model';

@Module({
  imports: [SequelizeModule.forFeature([Highlight])],
  // export it to use it outside this module
  exports: [SequelizeModule],
})
export class HighlightModule {}
