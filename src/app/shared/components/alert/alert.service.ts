import { Injectable } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Alert, AlertType } from './alert';

@Injectable({providedIn: 'root'})
export class AlertService {

  constructor(router: Router){
    router.events.subscribe(event => {
      if(event instanceof NavigationStart){
        this.keepAfterRouteChange ? this.keepAfterRouteChange = false : this.clear();
      }
    });
  }

  alertSubject: Subject<Alert> = new Subject<Alert>();
  keepAfterRouteChange = false;

  success(message: string, keepAfterRouteChange = false) {
    this.alert(AlertType.SUCCESS, message, keepAfterRouteChange);
  }

  warning(message: string, keepAfterRouteChange = false) {
    this.alert(AlertType.WARNING, message, keepAfterRouteChange);
  }

  info(message: string, keepAfterRouteChange = false) {
    this.alert(AlertType.INFO, message, keepAfterRouteChange);
  }

  danger(message: string, keepAfterRouteChange = false) {
    this.alert(AlertType.DANGER, message, keepAfterRouteChange);
  }

  private alert(alertType: AlertType, message: string, keepAfterRouteChange: boolean){
    this.keepAfterRouteChange = keepAfterRouteChange;
    this.alertSubject.next(new Alert(alertType, message));
  }

  getAlert(){
    return this.alertSubject.asObservable();
  }

  clear(){
    this.alertSubject.next(null);
  }

}