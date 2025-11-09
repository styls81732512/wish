import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { isJSON } from 'class-validator';
import dayjs from 'dayjs';
import { Request, Response, NextFunction } from 'express';
import { v4 as uuid } from 'uuid';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger(LoggerMiddleware.name);
  private jwtService = new JwtService();
  constructor() {}

  use(req: Request, res: Response, next: NextFunction) {
    const seq = uuid();

    const startTime = new Date();

    const token = req.headers.authorization?.replace('Bearer ', '') || '';

    try {
      const record = {
        message: 'REQUEST',
        method: req.method,
        url: req.originalUrl,
        params: req.body,
        userToken: token.slice(-10),
        userInfo: this.jwtService.decode(token),
        agent: req.headers['user-agent'],
        seq: seq,
      };

      this.logger.log(JSON.stringify(record));
    } catch (error) {
      this.logger.error('Failed to log request body:', { error, seq });
    }

    const send = res.send;
    res.send = (args) => {
      if (typeof args === 'string') {
        try {
          const record = {
            message: 'RESPONSE',
            method: req.method,
            url: req.originalUrl,
            code: res.statusCode,
            data: isJSON(args) ? JSON.parse(args) : args,
            time: dayjs().diff(startTime, 'ms'),
            contentLength: res.get('Content-Length'),
            seq: seq,
          };
          this.logger.log(JSON.stringify(record));
        } catch (error) {
          this.logger.error('Failed to log response body:', {
            error,
            args,
            seq,
          });
        }
      }
      return send.apply(res, [args]);
    };

    next();
  }
}
