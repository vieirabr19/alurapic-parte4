import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from 'src/app/core/auth/auth.service';
import { PlatformDetectorService } from 'src/app/core/platform-detector/platform-detector.service';

@Component({
  selector: 'ap-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  @ViewChild('userNameInput') userNameInput: ElementRef<HTMLInputElement>;
  loginForm: FormGroup;
  fromUrl: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private platformDetectorService: PlatformDetectorService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => this.fromUrl = params['fromUrl']);
    
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

  
    this.platformDetectorService.isPlatformBrowser() && this.userNameInput.nativeElement.focus();
  }

  login() {
    const userName = this.loginForm.get('userName').value;
    const password = this.loginForm.get('password').value;

    this.authService.autentications(userName, password).subscribe(
      () => this.fromUrl 
        ? this.router.navigateByUrl(this.fromUrl, {skipLocationChange: true})
        : this.router.navigate(['user', userName])
      ,
      error => {
        console.log(error);
        this.platformDetectorService.isPlatformBrowser() && this.userNameInput.nativeElement.focus();
        this.loginForm.reset();
      }
    )
  }

}
