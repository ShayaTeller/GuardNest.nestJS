import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuteModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ShiftsModule } from './shifts/shifts.module';
import { AssignmentsModule } from './assignments/assignments.module';
import { TypeORMError } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { UsersService } from './users/users.service';
const DATABASE_URL='postgresql://neondb_owner:npg_QcRKB1LE7vjF@ep-long-art-a2jkjn74-pooler.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'
@Module({
  imports: [
    AuteModule, 
    UsersModule,
    ShiftsModule,
    AssignmentsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true,
      ssl: true,
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
