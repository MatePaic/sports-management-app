import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { SportsModule } from './sports/sports.module';
import { ClassesModule } from './classes/classes.module';
import { ApplicationsModule } from './applications/applications.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Application } from './applications/application.entity';
import { Class } from './classes/class.entity';
import { Sport } from './sports/sport.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [
        User,
        Application,
        Class,
        Sport
      ],
      synchronize: true
    }),
    UsersModule, 
    AuthModule, 
    SportsModule, 
    ClassesModule, 
    ApplicationsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
