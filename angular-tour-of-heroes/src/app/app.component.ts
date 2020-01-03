import { Component, NgModule, VERSION } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location ,CommonModule} from '@angular/common';
import { AuthenticationService } from './authentication.service';//+

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tour of Heroes';
  constructor(private location: Location, public auth: AuthenticationService) { }
  isActive(viewLocation) {
    return viewLocation === this.location.path();
  };
}





