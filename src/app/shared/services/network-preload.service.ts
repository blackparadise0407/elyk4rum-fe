import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';

@Injectable()
export class NetWorkAwarePreloadingStrategy implements PreloadingStrategy {
  public preload(_route: Route, load: () => Observable<any>): Observable<any> {
    if (this.hasGoodConnection()) {
      return load();
    } else {
      return EMPTY;
    }
  }

  private hasGoodConnection(): boolean {
    const conn = (navigator as any).connection;

    if (conn) {
      if (conn.saveData) {
        return false;
      }

      const avoidTheseConnections = ['slow-2g', '2g', '3g'];
      const effectiveType = conn.effectiveType || '';

      if (avoidTheseConnections.includes(effectiveType)) {
        return false;
      }

      return true;
    }
    return false;
  }
}
