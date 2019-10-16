import { Component, NgModule, VERSION } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tour of Heroes';
  constructor(private location: Location) { }
  isActive(viewLocation) {
    return viewLocation === this.location.path();
  };
}





