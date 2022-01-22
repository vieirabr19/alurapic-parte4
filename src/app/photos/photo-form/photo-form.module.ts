import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { VmessageModule } from 'src/app/shared/components/vmessage/vmessage.module';
import { ImmediateClickModule } from 'src/app/shared/directives/immediate-clik/immediate-clik.module';
import { PhotoModule } from '../photo/photo.module';
import { PhotoFormComponent } from './photo-form.component';

@NgModule({
  declarations: [
    PhotoFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    VmessageModule,
    PhotoModule,
    ImmediateClickModule
  ]
})
export class PhotoFormModule {}