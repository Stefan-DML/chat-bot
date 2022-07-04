import { SnackService } from './../../services/snack.service';

import { ErrorHandler, Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
  HttpHandler,
  HttpEvent,
  HttpResponse
} from '@angular/common/http';

import { Observable, EMPTY, throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable()

export class errorHandler implements ErrorHandler  {
  constructor(public snack:SnackService){

  }
  handleError(error:any) {
    // do something with the exception
    console.log(error)
    this.snack.someError();
  }
}
