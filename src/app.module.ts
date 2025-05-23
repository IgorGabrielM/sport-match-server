import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { InterestsModule } from './interests/interests.module';
import { PostCommentsModule } from './post-comments/post-comments.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config'; // Import ConfigService
import { AuthModule } from './auth/auth.module';
// import { AuthGuard } from './auth/auth.guard'; // Ensure this is correctly handled if globally applied

import { RolesModule } from './roles/roles.module';
import { EventsModule } from './events/events.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${process.env.NODE_ENV || 'development'}`],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // Import ConfigModule here
      inject: [ConfigService], // Inject ConfigService
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE_NAME'),
        synchronize: configService.get<string>('DB_SYNCHRONIZE') === 'true', // Convert string to boolean
        entities: ['dist/**/*.entity{.ts,.js}'],
        autoLoadEntities: true,
        // The commented out configurations below are now superseded by .env variables
        // type: 'mysql',
        // host: 'sql.freedb.tech',
        // port: 3306,
        // username: 'freedb_nailton',
        // password: 'Rft&em9mX4P2j!S',
        // database: 'freedb_study-space',
        // synchronize: true,
        // entities: ['dist/**/*.entity{.ts,.js}'],
        // autoLoadEntities: true,
        // type: 'mysql',
        // host: 'mysql-9b5161c-nailtonvital35-95ab.b.aivencloud.com',
        // port: 25037,
        // username: 'avnadmin',
        // password: 'AVNS_mZZBqHk5JFdSCbv2QBa',
        // database: 'defaultdb',
        // synchronize: true,
        // entities: ['dist/**/*.entity{.ts,.js}'],
        // autoLoadEntities: true,
      }),
    }),
    UsersModule,
    PostsModule,
    InterestsModule,
    PostCommentsModule,
    AuthModule,
    RolesModule,
    EventsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: 'APP_GUARD',
    //   useClass: AuthGuard,
    // },
  ],
})
export class AppModule {}
