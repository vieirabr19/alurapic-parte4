import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'ap-search',
  templateUrl: './search.component.html'
})
export class Search implements OnInit, OnDestroy {
  debounce: Subject<string> = new Subject<string>();
  @Output() onTyping = new EventEmitter<string>();
  @Input() value = '';
  
  ngOnInit(): void {
    this.debounce
    .pipe(debounceTime(400))
    .subscribe(filter => this.onTyping.emit(filter));
  }

  ngOnDestroy(): void {
    this.debounce.unsubscribe();
  }

  onFind(event: string): void {
    this.debounce.next(event);
  }
}