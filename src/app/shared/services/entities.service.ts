import { BehaviorSubject, map, Observable, withLatestFrom } from 'rxjs';

import {
  Comparer,
  IdSelector,
  Update,
} from '$shared/interfaces/entities.interface';

export class EntitiesService<T> {
  private entities$ = new BehaviorSubject<Record<string, T>>({});
  private ids = new BehaviorSubject<Array<string | number>>([]);
  private selectId: IdSelector<T>;
  private sortComparer?: Comparer<number | string>;

  constructor({
    intitialData,
    selectId,
    sortComparer,
  }: {
    intitialData: T[];
    selectId: IdSelector<T>;
    sortComparer?: Comparer<number | string>;
  }) {
    this.entities$.next(
      intitialData.reduce((res, curr) => {
        res[selectId(curr)] = curr;
        return res;
      }, {} as Record<string, T>)
    );
    this.ids.next(
      intitialData.map((item) => selectId(item)).sort(sortComparer)
    );
    this.selectId = selectId ?? ((entity: any) => entity.id);
    this.sortComparer = sortComparer;
  }

  public getOne(id: string | number): Observable<T> {
    return this.entities$.pipe(map((data) => data[id]));
  }

  public updateOne({ id, changes }: Update<T>) {
    const entities = this.entities$.getValue();
    entities[id] = {
      ...entities[id],
      ...changes,
    };
    this.entities$.next(entities);
  }

  public updateMany(updates: Update<T>[]) {
    const entities = this.entities$.getValue();
    updates.forEach(({ id, changes }) => {
      if (entities[id]) {
        entities[id] = {
          ...entities[id],
          ...changes,
        };
      }
    });
  }

  public getAll() {
    return this.getEntities().pipe(
      withLatestFrom(this.ids),
      map(([entities, ids]) => ids.map((id) => entities[id]))
    );
  }

  public getEntities() {
    return this.entities$.asObservable();
  }

  public setAll(data: T[]) {
    const ids = data.map((item) => this.selectId(item)).sort(this.sortComparer);
    this.ids.next(ids);
    const entities = this.mapToEntities(data);
    this.entities$.next(entities);
  }

  public addOne(data: T) {
    const newIds = this.ids.getValue();
    newIds.push(this.selectId(data));

    const entities = this.entities$.getValue();
    entities[this.selectId(data)] = data;
    this.entities$.next(entities);
    this.ids.next(newIds.sort(this.sortComparer));
  }

  public addMany(data: T[]) {
    const newsIds = this.ids.getValue();
    newsIds.push(...data.map((item) => this.selectId(item)));
    this.ids.next(newsIds.sort(this.sortComparer));
    const entities = this.entities$.getValue();

    data.forEach((item) => {
      entities[this.selectId(item)] = item;
    });
    this.entities$.next(entities);
  }

  private mapToEntities(data: T[]) {
    return data.reduce((res, curr) => {
      res[this.selectId(curr)] = curr;
      return res;
    }, {} as Record<string, T>);
  }
}
