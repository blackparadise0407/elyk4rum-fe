import { Location } from '@angular/common';
import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { parse, ParseOptions, stringify, StringifyOptions } from 'query-string';
import { BehaviorSubject, Subject } from 'rxjs';

const FORMAT: ParseOptions & StringifyOptions = {
  arrayFormat: 'comma',
  parseBooleans: true,
  parseNumbers: true,
};

@Injectable({ providedIn: 'root' })
export class QueryParamsService<T> implements OnDestroy {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private queryParams = new BehaviorSubject<T>({} as T);
  private stop$ = new Subject<void>();

  constructor(private location: Location, private route: ActivatedRoute) {
    this.queryParams.next(this.getQueryParams());
  }

  public ngOnDestroy(): void {
    this.stop$.next();
    this.stop$.complete();
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
    this.location.replaceState(window.location.pathname);
  }
}
