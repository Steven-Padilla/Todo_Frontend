import { Component, Input,inject,Output, EventEmitter } from '@angular/core';
import { Todo } from 'src/app/models/todo.model';
import {MatDialog} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
})
export class TodoComponent {
  @Output() sendData = new EventEmitter<Todo>();
  http=inject(HttpClient);
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
    let dialogRef=this.matDialog.open(DialogComponent, {
      height: '55vh',
      width: '55vw',
      data: {
        id: id,
        title: title,
        description: description,
      },
      ariaDescribedBy: this.todo.id.toString(),
    });
    dialogRef.afterClosed().subscribe((data) => {
      if (data){
        this.todo=data
      }
    })
    dialogRef.backdropClick().subscribe(_ => {
      dialogRef.close();
    })
    
  }

}
