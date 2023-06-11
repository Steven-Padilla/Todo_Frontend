import { Component, Input } from '@angular/core';
import { Todo } from 'src/app/models/todo.model';
import {MatDialog} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
})
export class TodoComponent {
  @Input() todo: Todo = {
    id: 1,
    title: 'No title',
    description: 'No description',
  };
  constructor(private readonly matDialog:MatDialog){}
  openDialog() {
    const id = this.todo.id;
    const title = this.todo.title;
    const description = this.todo.description;
    this.matDialog.open(DialogComponent, {
      height: '55vh',
      width: '55vw',
      data: {
        id: id,
        title: title,
        description: description,
      },
      ariaDescribedBy: this.todo.id.toString(),
      autoFocus:true,
      position:{
        top:'-60vh',
        left:'19vw',
      }
    });
  }
}
