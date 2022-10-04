import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

import { EntitiesService } from '$shared/services/entities.service';

import { Category } from '../interfaces/categories.interface';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService extends EntitiesService<Category> {
  constructor(private http: HttpClient) {
    super({
      intitialData: [],
      selectId: (category) => category.id,
    });
  }

  public getCategories() {
    return this.http.get<Category[]>('api/categories').pipe(
      tap((categories) => {
        this.setAll(categories);
      })
    );
  }
}
