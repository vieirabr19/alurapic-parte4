import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { debounceTime, first, map, switchMap } from 'rxjs/operators';
import { SigUpService } from './signup.service';

@Injectable()
export class UserNotTakenValidatorService {
  constructor(
    private sigUpService: SigUpService
  ){}

  checkUserNameTaken(){
    return (control: AbstractControl) => {
      return control.valueChanges
        .pipe(debounceTime(400))
        .pipe(switchMap(userName => this.sigUpService.checkUserNameTaken(userName)))
        .pipe(map(isTaken => isTaken ? {userNameTaken: true} : null))
        .pipe(first());
    }
  }
}