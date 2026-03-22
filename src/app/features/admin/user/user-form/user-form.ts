import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../../../models/user.model';

@Component({
  selector: 'app-user-form',
  imports: [],
  templateUrl: './user-form.html',
  styleUrl: './user-form.css',
})
export class UserForm {
  @Input() user : User | null = null
  @Output() close = new EventEmitter<boolean>(); // emit true if saved

  saveUser() {
    // call service to save/add user
    // then close modal
    this.close.emit(true);
  }

  cancel() {
    this.close.emit(false);
  }
}
