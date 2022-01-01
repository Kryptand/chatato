import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class ActivityMiddleware implements NestMiddleware {
  constructor(private readonly activityService: Cr) {}
  }

  use(req: Request, res: Response, next) {
    const jwt=req.headers.get('Authorization');
    const user=
    if(jwt){
      const token=jwt.split(' ')[1];
      const payload=jwt.split(' ')[1];
      const userId=payload.split('.')[0];
      const userName=payload.split('.')[1];
      req.userId=userId;
      req.userName=userName;
    }
    next();
  }
}
