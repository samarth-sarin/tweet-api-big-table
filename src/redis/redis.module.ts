import { Global, Module } from '@nestjs/common';
import { RedisService } from './redis.service';

@Global() // 👈 makes it available everywhere
@Module({
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
