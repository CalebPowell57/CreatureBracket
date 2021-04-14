import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'app';
  constructor(private router: Router) {

  }
 
  ngOnInit() {

    var CurrentURL = window.location.href;
    if (CurrentURL !== window.origin) {
      var LoadingAnimation = document.querySelector(".LoadingAnimation");
      LoadingAnimation.classList.add("Loaded")
      LoadingAnimation.addEventListener("animationend", function (){
        this.remove();
      })
    }


  }
}
