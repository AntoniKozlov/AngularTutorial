import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tour of Heroes';

  changeColorDash():void{/*
    var eldash = document.getElementsByClassName("navDashboard");
    var elhero = document.getElementsByClassName("navHeroes");
    if (eldash == true) {
      eldash.styles.background = "black";
    }*/
  }
  changeColorHeroes():void{

  }
}




