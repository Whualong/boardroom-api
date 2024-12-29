import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { EmailModule } from './email/email.module';
import { PrismaModule } from './prisma/prisma.module';
import { RedisModule } from './redis/redis.module';
import { PrismaService } from './prisma/prisma.service';
import { MinioModule } from './minio/minio.module';

@Module({
  imports: [
    PrismaModule,
    EmailModule,
    UserModule,
    RedisModule,
    MinioModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService
  ],
})
export class AppModule { }
