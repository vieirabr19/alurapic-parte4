import { Component, Input, OnInit, ɵgetComponentViewDefinitionFactory } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { PhotoComment } from '../../photo/photo-comment';
import { PhotoService } from '../../photo/photo.service';

@Component({
  selector: 'ap-photo-comments',
  templateUrl: './photo-comments.component.html',
  styleUrls: ['./photo-comments.component.css']
})
export class PhotoCommentsComponent implements OnInit {
  @Input() photoId: number;
  comments$: Observable<PhotoComment[]>;
  form: FormGroup;

  constructor(
    private photoService: PhotoService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.comments$ = this.photoService.getComments(this.photoId);

    this.form = this.fb.group({
      comment: ['', [Validators.required, Validators.maxLength(300)]]
    });
  }

  submit(){
    const comment = this.form.get('comment').value as string;
    this.comments$ = this.photoService.addComments(this.photoId, comment)
      .pipe(switchMap(() => this.photoService.getComments(this.photoId)))
      .pipe(tap(() => {
        this.form.reset();
      }));
  }
}