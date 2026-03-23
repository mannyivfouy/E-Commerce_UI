import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'app-search',
  imports: [CommonModule, FormsModule],
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class Search implements OnInit {
  searchText: string = '';
  private searchSubject = new Subject<string>();

  @Output() searchChange = new EventEmitter<string>();

  ngOnInit(): void {
    this.searchSubject.pipe(debounceTime(400), distinctUntilChanged()).subscribe((value) => {
      this.searchChange.emit(value);
    });
  }

  onTyping() {
    this.searchSubject.next(this.searchText);
  }

  onClear() {
    this.searchText = '';
    this.searchSubject.next('');
  }
}
