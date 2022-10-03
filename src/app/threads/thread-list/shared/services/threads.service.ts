import { Injectable } from '@angular/core';

import { HttpWrapper } from '$shared/services/http-wrapper.service';

import { Thread } from '../interfaces/threads.interface';

@Injectable()
export class ThreadsService {
  constructor(private httpWrapper: HttpWrapper) {}

  public getThreads() {
    return this.httpWrapper.get<Thread[]>('api/threads');
  }
}
