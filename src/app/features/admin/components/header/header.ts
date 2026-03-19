import { Component, OnInit } from '@angular/core';
import { Avatar } from '../../../../shared/components/avatar/avatar';

@Component({
  selector: 'app-header',
  imports: [Avatar],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {
  fullname: string = '';
  currentTime: string = '';

  ngOnInit(): void {
    const storedName = localStorage.getItem('fullname');
    this.fullname = storedName ? storedName : '';
  }
}
