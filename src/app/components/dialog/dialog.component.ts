import { Component, Inject,inject,Output, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Todo } from 'src/app/models/todo.model';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
})
export class DialogComponent {
  @Output() sendData= new EventEmitter<Todo>();
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { id: number; title: string; description: string },
    private matDialogRef: MatDialogRef<DialogComponent>
  ) {}
  http=inject(HttpClient);

  todoForm = new FormGroup({
    title: new FormControl(this.data.title),
    description: new FormControl(this.data.description),
  });

  async updateTodo() {
    
    this.http
      .put<Todo>(`http://localhost:3000/todo/${this.data.id}`, this.todoForm.value)
      .subscribe({
        next: (todoUpdated) => {
          let json={
            id:this.data.id,
            title:this.todoForm.value.title ? this.todoForm.value.title : "",
            description:this.todoForm.value.description ? this.todoForm.value.description : ""
          }
          this.data =json
          this.sendData.emit(json);
          console.log('todoupdated' + JSON.stringify(todoUpdated));
          this.matDialogRef.close(json)
        },
        error: (error) => {
          console.error('Request failed with error\n' + error);
        },
      });
  }
}
