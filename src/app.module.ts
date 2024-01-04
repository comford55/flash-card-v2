import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { dbConfig } from './config/db.config';
import { UsersModule } from './users/users.module';

@Module({
  imports: [TypeOrmModule.forRootAsync(dbConfig), ConfigModule.forRoot({ isGlobal: true }), UsersModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule { }
