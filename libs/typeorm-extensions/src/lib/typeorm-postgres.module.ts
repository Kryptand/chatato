import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({})
export class TypeormPostgresModule {
  public static forRoot(identifier: string, entities: any[]): any {
    const module = TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => {
        console.debug(config);
        return {
          type: 'postgres',
          host: 'localhost',
          port: config.get(identifier + '_DB_PORT'),
          username: config.get(identifier + '_DB_USER'),
          password: config.get(identifier + '_DB_PW'),
          database: config.get(identifier + '_DB_NAME'),
          entities: [...entities],
          synchronize: true,
          keepConnectionAlive: false,
        };
      },
      inject: [ConfigService],
    });
    return {
      module: TypeormPostgresModule,
      imports: [module],
      exports: [module],
    };
  }
}
