import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Page } from './page.model';

@Module({
  imports: [SequelizeModule.forFeature([Page])],
  // export it to use it outside this module
  exports: [SequelizeModule],
})
export class PageModule {}
