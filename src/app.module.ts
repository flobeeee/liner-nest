import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user/user.model';
import { Theme } from './theme/theme.model';
import { UserModule } from './user/user.module';
import { ThemeModule } from './theme/theme.module';
import { PageModule } from './page/page.module';
import { HighlightModule } from './highlight/highlight.module';
import { Page } from './page/page.model';
import { Highlight } from './highlight/highlight.model';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      username: 'root',
      password: null,
      database: 'liner_nest',
      models: [User, Theme, Page, Highlight],
    }),
    UserModule,
    ThemeModule,
    PageModule,
    HighlightModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
