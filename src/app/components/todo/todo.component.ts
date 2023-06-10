import { Component,Input } from '@angular/core';
import { Todo } from 'src/app/models/todo.model';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
})
export class TodoComponent {
  @Input() todo :Todo={
    id:1,
    title:'No title',
    description:"No description",
  };
  constructor(private readonly matDialog:MatDialog){}

  openDialog(){
    // this.matDialog.open()
  }
}
