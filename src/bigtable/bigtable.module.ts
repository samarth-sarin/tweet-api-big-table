import { Module } from '@nestjs/common';
import { BigtableService } from './bigtable.service';

@Module({
  providers: [BigtableService],
  exports: [BigtableService],
})
export class BigtableModule {}