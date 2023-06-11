import { Component, inject } from '@angular/core';
import { Todo } from 'src/app/models/todo.model';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  http=inject(HttpClient);
  title = 'todo_frontend';
  todos: Todo[] = [];
  baseURL: string = 'http://localhost:3000/';
  ngOnInit() {
    this.http.get<Todo[]>('http://localhost:3000/todo').subscribe({
      next: (todoList) => {
        this.todos = todoList;
      },
      error: (error) => {
        console.error('Request failed with error\n' + error);
      },
    });
  }
  
}
