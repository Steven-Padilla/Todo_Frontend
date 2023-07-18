import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  isLoged=false
  
  setLogin(state:boolean){
    this.isLoged=state
  }

  ngOnInit(){
    const token= window.localStorage.getItem('user-token')
    if (token){
      this.isLoged=true
    }
  }
  
}
