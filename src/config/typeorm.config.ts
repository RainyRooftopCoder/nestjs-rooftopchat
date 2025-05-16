import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const getTypeOrmConfig = async (
  configService: ConfigService,
): Promise<TypeOrmModuleOptions> => ({
  type: 'postgres',
  host: configService.get<string>('DB_HOST'),
  port: configService.get<number>('DB_PORT'),
  username: configService.get<string>('DB_USERNAME'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_NAME'),
  autoLoadEntities: true, // @Entity() 로 등록된 모든 엔티티를 자동으로 인식
  //synchronize: true, // 시스템실행시 Entity 정의에 따라 스키마 자동생성(초기 사용 운용에서는 사용하면 안됨 false로 바꿈)
});
