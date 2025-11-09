import { Pagination } from './pagination';
import {
  DeleteResult,
  FindManyOptions,
  FindOneOptions,
  In,
  ObjectLiteral,
  Repository,
  SelectQueryBuilder,
  UpdateResult,
} from 'typeorm';
import { IBaseService } from './interfaces/base.service.interface';
import { BasePaginationDto } from './dto/base.pagination.dto';

export class BaseService<T extends ObjectLiteral> implements IBaseService<T> {
  constructor(private readonly genericRepository: Repository<T>) {}

  create(entity: any): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      this.genericRepository
        .save(entity)
        .then((created) => resolve(created.id))
        .catch((error) => reject(error));
    });
  }

  delete(id: number): Promise<DeleteResult> {
    return this.genericRepository.delete(id);
  }

  restore(id: number): Promise<UpdateResult> {
    return new Promise<UpdateResult>((resolve, reject) => {
      this.genericRepository
        .findOneOrFail({
          where: { id },
          withDeleted: true,
        } as unknown as FindOneOptions<T>)
        .then(() => {
          this.genericRepository
            .restore(id)
            .then((response) => resolve(response))
            .catch((error) => reject(error));
        })
        .catch((error) => reject(error));
    });
  }

  softDelete(id: number): Promise<UpdateResult> {
    return new Promise<UpdateResult>((resolve, reject) => {
      this.genericRepository
        .findOneOrFail({ where: { id } } as unknown as FindOneOptions<T>)
        .then(() => {
          this.genericRepository
            .softDelete(id)
            .then((response) => resolve(response))
            .catch((error) => reject(error));
        })
        .catch((error) => reject(error));
    });
  }

  findAllByPagination(
    options: BasePaginationDto,
    queryBuilder: SelectQueryBuilder<T>,
  ): Promise<Pagination<T>> {
    return new Promise<Pagination<T>>((resolve, reject) => {
      queryBuilder
        .take(options.limit)
        .skip((options.page - 1) * options.limit)
        .getManyAndCount()
        .then(([data, total]) => {
          const pagination = new Pagination<T>({
            total,
            current: +options.page,
            limit: +options.limit,
            data,
          });
          resolve(pagination);
        })
        .catch((error) => reject(error));
    });
  }

  findOne(id: number | string): Promise<T | null> {
    return this.genericRepository.findOne({
      where: { id },
    } as unknown as FindOneOptions<T>);
  }

  findOneByCondition(condition: FindOneOptions<T>): Promise<T | null> {
    return this.genericRepository.findOne(condition);
  }

  findManyByCondition(condition: FindManyOptions<T>): Promise<T[]> {
    return this.genericRepository.find(condition);
  }

  findOneOrFail(id: number | string): Promise<T> {
    return this.genericRepository.findOneOrFail({
      where: { id },
    } as unknown as FindOneOptions<T>);
  }

  findMany(ids: number[]): Promise<T[]> {
    return this.genericRepository.find({
      where: {
        id: In(ids),
      },
    } as unknown as FindManyOptions<T>);
  }

  update(entity: any): Promise<T> {
    return new Promise<any>((resolve, reject) => {
      this.genericRepository
        .findOneOrFail({
          where: { id: entity.id },
        } as FindOneOptions<T>)
        .then(() => {
          this.genericRepository
            .save(entity)
            .then((response) => resolve(response))
            .catch((error) => reject(error));
        })
        .catch((error) => reject(error));
    });
  }
}
