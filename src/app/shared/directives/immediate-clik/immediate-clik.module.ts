import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ImmediateClickDirective } from './immediate-clik.directive';

@NgModule({
  declarations: [ImmediateClickDirective],
  imports: [CommonModule],
  exports: [ImmediateClickDirective]
})
export class ImmediateClickModule {}