import { HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

import { UserService } from 'src/app/core/user/user.service';
import { AlertService } from 'src/app/shared/components/alert/alert.service';
import { PhotoService } from '../photo/photo.service';

@Component({
  selector: 'ap-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.css']
})
export class PhotoFormComponent implements OnInit {
  form: FormGroup;
  file: File;
  preview: string;
  percentDone = 0;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private photoService: PhotoService,
    private alertService: AlertService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      description: ['', [Validators.maxLength(300)]],
      allowComments: [true],
      file: ['', [Validators.required]]
    });
  }

  upload() {
    const description = this.form.get('description').value;
    const allowComments = this.form.get('allowComments').value;
    this.photoService
      .upload(description, allowComments, this.file)
      .pipe(finalize(() =>
        this.router.navigate(['/user', this.userService.getUserName()])
      ))
      .subscribe((event: HttpEvent<any>) => {
        if (event.type == HttpEventType.UploadProgress) {
          this.percentDone = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.alertService.success('Upload complete', true);
        }
      },
      err => {
        console.log(err);
        this.alertService.danger('Upload error!', true);
      });
  }

  handleFile(file: File) {
    this.file = file;
    const reader = new FileReader();
    reader.onload = (event: any) => this.preview = event.target.result;
    reader.readAsDataURL(file);
  }

}
