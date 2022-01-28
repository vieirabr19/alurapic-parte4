import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ErrorHandler, Injectable, Injector, Type } from '@angular/core';
import * as stacktrace from 'stacktrace-js';

import { UserService } from 'src/app/core/user/user.service';
import { ServerLogService } from './server-log.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor(private injector: Injector) { }

  handleError(error: any): void {
    const location = this.injector.get(LocationStrategy as Type<LocationStrategy>);
    const userService = this.injector.get(UserService);
    const serverLog = this.injector.get(ServerLogService);
    const router = this.injector.get(Router);

    const url = location instanceof PathLocationStrategy ? location.path() : '';
    const message = error.message ? error.message : error.toString();

    if(environment.production) router.navigate(['/error']);

    stacktrace.fromError(error)
      .then(stackframes => {
        const stackAsString = stackframes.map(sf => sf.toString()).join('\n');

        console.log(message);
        console.log(stackAsString);
        console.log('o que será enviado para o servidor');
        
        serverLog.log({
          message, 
          url, 
          userName: userService.getUserName(), 
          stack: stackAsString 
        }).subscribe(
          () => console.log('Error logged on server'),
          err => {
            console.log(err);
            console.log('Fail to send error log to server');
          }
        );
      });
  }

}