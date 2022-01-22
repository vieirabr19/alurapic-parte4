import { Component, Input } from '@angular/core';
import { environment } from '../../../environments/environment';

const CLOUD = environment.apiUrlImgs;

@Component({
  selector: 'ap-photo',
  templateUrl: 'photo.component.html'
})
export class PhotoComponent {
  @Input() description = '';
  private _url = '';

  @Input() set url(url: string){
    !url.startsWith('data') ? this._url = CLOUD + url : this._url = url;
  }
  
  get url() {
    return this._url;
  }
}