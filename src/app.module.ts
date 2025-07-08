import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        type: config.get<'postgres'>('DB_CONNECTION'),
        host: config.get<string>('PG_HOST'),
        username: config.get<string>('PG_USER'),
        password: config.get<string>('PG_PASSWORD'),
        port: config.get<number>('PG_PORT'),
        database: config.get<string>('PG_DB'),
        entities: [__dirname + 'dist/**/*.entitiy{.ts,.js}'],
        synchronize: true,
        autoLoadEntities: true,
        logging: false,
      }),
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
