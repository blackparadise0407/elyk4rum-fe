import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { parse, ParseOptions, stringify, StringifyOptions } from 'query-string';
import { BehaviorSubject } from 'rxjs';

const FORMAT: ParseOptions & StringifyOptions = {
  arrayFormat: 'comma',
  parseBooleans: true,
  parseNumbers: true,
};

@Injectable({ providedIn: 'root' })
export class QueryParamsService<T> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private queryParams = new BehaviorSubject<T>({} as T);

  constructor(private location: Location) {
    this.queryParams.next(this.getQueryParams());
  }

  public get queryParams$() {
    return this.queryParams.asObservable();
  }

  public getQueryParams() {
    return parse(window.location.search.substring(1), FORMAT) as unknown as T;
  }

  // TODO: Add update mode
  public updateQueryParams(changes: Partial<T>) {
    const nextQuery = Object.assign(this.getQueryParams() || {}, changes);
    const queryString = stringify(nextQuery, FORMAT);
    this.location.replaceState(window.location.pathname, `?${queryString}`);
    this.queryParams.next(nextQuery as T);
  }

  public clear() {
    this.queryParams.next({} as T);
  }
}
