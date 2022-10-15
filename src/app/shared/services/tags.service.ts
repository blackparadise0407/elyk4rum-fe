import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

import { Tag } from '$shared/interfaces/tags.interface';

import { EntitiesService } from './entities.service';

@Injectable({ providedIn: 'root' })
export class TagsService extends EntitiesService<Tag> {
  private memoizedQuery: string[] = [];

  constructor(private http: HttpClient) {
    super({
      intitialData: [],
      selectId: (tag) => tag.id,
    });
  }

  public getTags(q = '') {
    const path = `api/tags?q=${q}`;
    if (!this.memoizedQuery.includes(path)) {
      this.memoizedQuery.push(path);
      return this.http.get<Tag[]>(path).pipe(
        tap((tags) => {
          this.addMany(tags);
        })
      );
    }
    return this.getAll();
  }

  public createTag(name: string) {
    const path = `api/tags`;
    return this.http.post<Tag>(path, { name });
  }

  public addTag(name: string) {
    return this.createTag(name).pipe(tap((tag) => this.addOne(tag)));
  }
}
