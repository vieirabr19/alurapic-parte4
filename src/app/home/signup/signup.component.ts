import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { PlatformDetectorService } from 'src/app/core/platform-detector/platform-detector.service';
import { lowerCaseValidator } from 'src/app/shared/validators/lower-case.validator';
import { NewUser } from './new-user';
import { SigUpService } from './signup.service';
import { userNamePassword } from './user-name-password.validator';
import { UserNotTakenValidatorService } from './user-not-taken.validator.service';

@Component({
  templateUrl: './signup.component.html',
  providers: [UserNotTakenValidatorService]
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  @ViewChild('emailInput') emailInput: ElementRef<HTMLInputElement>;

  constructor(
    private fb: FormBuilder,
    private userNotTakenValidatorService: UserNotTakenValidatorService,
    private sigUpService: SigUpService,
    private router: Router,
    private platformDetectorService: PlatformDetectorService
  ) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      fullName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(40)]],
      userName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(30),
          lowerCaseValidator
        ],
        this.userNotTakenValidatorService.checkUserNameTaken()
      ],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(14)]]
    },
    {
      validator: userNamePassword
    });

    this.platformDetectorService.isPlatformBrowser && this.emailInput.nativeElement.focus();
  }

  signup() {
    if(this.signupForm.valid && !this.signupForm.pending) {
      const newUser = this.signupForm.getRawValue() as NewUser;

      this.sigUpService.signup(newUser).subscribe(
        () => this.router.navigate(['']),
        err => console.log(err)
      )
    }
  }

}