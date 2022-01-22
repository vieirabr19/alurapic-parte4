import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { PhotoDetailsModule } from './photo-details/photo-details.module';
import { PhotoFormModule } from './photo-form/photo-form.module';
import { PhotoListModule } from './photo-list/photo-list.module';


@NgModule({
  imports: [
    CommonModule,
    PhotoListModule,
    PhotoFormModule,
    PhotoDetailsModule
  ]
})
export class PhotosModule { }