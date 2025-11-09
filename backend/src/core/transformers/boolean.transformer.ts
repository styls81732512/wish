import { Transform } from 'class-transformer';

/**
 * 將收到的 string 轉成 boolean
 */
export function BooleanTransformer(): PropertyDecorator {
  return Transform(({ value }) => value === 'true' || value === '1');
}
