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
    const idUser = window.localStorage.getItem('userID') 
    this.http.get<Todo[]>(this.baseURL + 'todo/'+idUser).subscribe({
      next: (todoList) => {
        this.todos = todoList;
      },
      error: (error) => {
        console.error('Request failed with error\n' + error);
      },
    });
  }
  addToDb() {
    const idUser = window.localStorage.getItem('userID') 
    const data={
      title:this.todoForm.value.title,
      description:this.todoForm.value.description,
      userIdName:idUser
    }
    this.http
      .post<Todo[]>(this.baseURL + 'todo', data)
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
