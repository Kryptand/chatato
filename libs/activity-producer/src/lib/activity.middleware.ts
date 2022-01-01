import { Injectable, NestMiddleware } from '@nestjs/common';
import { ActivityProducerService } from '@chatato/activity-producer';

@Injectable()
export class ActivityMiddleware implements NestMiddleware {
  constructor(private readonly activityService: ActivityProducerService) {}

  use(req: Request, res: Response, next) {
    const user = req['user'];
    if (user) {
      this.activityService.sendActivity(user.id);
    }
    next();
  }
}
