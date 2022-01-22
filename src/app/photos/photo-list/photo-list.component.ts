import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Photo } from '../photo/photo';
import { PhotoService } from '../photo/photo.service';

@Component({
  selector: 'ap-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit {

  photos: Photo[] = [];
  filter = '';
  hasMore = true;
  currentPage = 1;
  userName = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private photoService: PhotoService
    ) {}
    
    ngOnInit(){
      this.activatedRoute.params.subscribe(params => {
        this.userName = params['userName'];
        this.photos = this.activatedRoute.snapshot.data['photos'];
      });
    }

    load(){
      this.photoService.listFromUserPagination(this.userName, ++this.currentPage).subscribe(photos => {
        this.filter = '';
        this.photos = this.photos.concat(photos);
        if(!photos.length) this.hasMore = false;
      });
    }
}
