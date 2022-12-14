import { HttpHeaders, HttpParams } from '@angular/common/http';

export interface HttpWrapperOptions {
  body?: any;
  headers?:
    | HttpHeaders
    | {
        [header: string]: string | string[];
      };
  params?:
    | HttpParams
    | {
        [param: string]:
          | string
          | number
          | boolean
          | ReadonlyArray<string | number | boolean>;
      };
}

export interface CustomHttpError {
  statusCode: number;
  error: string;
  message: string[];
  errors: any;
  timestamp: Date;
  path: string;
}
