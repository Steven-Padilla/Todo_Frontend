import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Todo } from 'src/app/models/todo.model';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
})
export class DialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { id: number; title: string; description: string },
    private matDialogRef: MatDialogRef<DialogComponent>
  ) {}
  http = inject(HttpClient);

  todoForm = new FormGroup({
    title: new FormControl(this.data.title),
    description: new FormControl(this.data.description),
  });

  async updateTodo() {
    this.http
      .put<Todo>(
        `http://localhost:3000/todo/${this.data.id}`,
        this.todoForm.value
      )
      .subscribe({
        next: (todoUpdated) => {
          this.data = todoUpdated;
          this.matDialogRef.close(todoUpdated);
        },
        error: (error) => {
          console.error('Request failed with error\n' + error);
        },
      });
  }
  deleteTodo() {
    this.http
      .delete<Todo>(`http://localhost:3000/todo/${this.data.id}`)
      .subscribe({
        next: () => {
          alert(`Delete: ${this.data.id}`);
          location.reload();
          this.matDialogRef.close(this.data.id);

        },
        error: (error) => {
          alert('Request failed');
          console.error('Request failed with error\n' + error);
        },
      });
  }
}
