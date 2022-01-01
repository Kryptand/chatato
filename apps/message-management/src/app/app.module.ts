import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import {
  ActivityMiddleware,
  ActivityProducerModule,
} from '@chatato/activity-producer';

@Module({
  imports: [ActivityProducerModule],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ActivityMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
