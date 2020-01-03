import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';

import { AppComponent }         from './app.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { HeroDetailComponent }  from './hero-detail/hero-detail.component';
import { DialogOverviewExampleDialog, DialogOverviewExampleDialog2, DialogDelete, HeroesComponent } from './heroes/heroes.component';
import { MessagesComponent }    from './messages/messages.component';

import { AppRoutingModule }     from './app-routing.module';

import { HttpClientModule }    from '@angular/common/http';
import { MatTabsModule, MatSidenavModule, MatToolbarModule } from '@angular/material';
import {MatFormFieldModule} from '@angular/material/form-field';
//import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
//import { InMemoryDataService }  from './in-memory-data.service';
import { HeroSearchComponent } from './hero-search/hero-search.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTableModule, MatTable} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material';
import { ReactiveFormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';

import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { AuthenticationService } from './authentication.service';
import { AuthGuardService } from './auth-guard.service';

import { RouterModule, Routes } from '@angular/router';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    HttpModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonToggleModule,
    MatInputModule,
    MatAutocompleteModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatMenuModule,
    MatSelectModule,
    ReactiveFormsModule,

    BrowserModule,
    FormsModule,
    HttpClientModule,

    MatSidenavModule,
    MatTabsModule,
    MatToolbarModule,

    MatFormFieldModule,
    //RouterModule.forRoot(routes),

   // ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),

/*HttpClientInMemoryWebApiModule.forRoot(
  InMemoryDataService, { dataEncapsulation: false }
),*/

BrowserAnimationsModule
  ],
  providers: [
    AuthenticationService,
    AuthGuardService
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    HeroSearchComponent,
    DialogOverviewExampleDialog,
    DialogOverviewExampleDialog2,
    DialogDelete,
    ProfileComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
  ],
  bootstrap: [ AppComponent ],
  entryComponents: [DialogOverviewExampleDialog, DialogOverviewExampleDialog2, DialogDelete]
})
export class AppModule { }

