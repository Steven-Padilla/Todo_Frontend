import { Component, inject } from '@angular/core';
import { Todo } from 'src/app/models/todo.model';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  todoForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(4)]),
    description: new FormControl(''),
  });
  http = inject(HttpClient);
  todos: Todo[] = [];
  baseURL: string = 'http://localhost:3000/';
  ngOnInit() {
    this.http.get<Todo[]>(this.baseURL + 'todo').subscribe({
      next: (todoList) => {
        this.todos = todoList;
      },
      error: (error) => {
        console.error('Request failed with error\n' + error);
      },
    });
  }
  addToDb() {
    console.debug(this.todoForm.value);
    this.http
      .post<Todo[]>(this.baseURL + 'todo', this.todoForm.value)
      .subscribe({
        next: (todo) => {
          this.todos = this.todos.concat(todo);
          this.todoForm.setValue({ title: '', description: '' });
        },
        error: (error) => {
          console.error('Request failed with error\n' + error);
        },
      });
  }
}
