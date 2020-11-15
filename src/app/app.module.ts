import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';

import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
// import { AngularFirestoreModule } from '@angular/fire';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PetManagementComponent } from './pet-management/pet-management.component';
import { PetManagementAddComponent } from './pet-management-add/pet-management-add.component';
import { PetManagementViewComponent } from './pet-management-view/pet-management-view.component';
import { AppRoutingModule } from './app-routing.module';
import { PetSearchComponent } from './pet-search/pet-search.component';
import { FormsModule } from '@angular/forms';
import { LogInPageComponent } from './log-in-page/log-in-page.component';
import { SignUpPageComponent } from './sign-up-page/sign-up-page.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { PetCareComponent } from './pet-care/pet-care.component';
import { HttpClientModule } from '@angular/common/http';
import { PetInquireComponent } from './pet-inquire/pet-inquire.component';
import { BlogContentComponent } from './pet-care/blog-content/blog-content.component';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomePageComponent,
    PetManagementComponent,
    PetManagementAddComponent,
    PetManagementViewComponent,
    PetSearchComponent,
    LogInPageComponent,
    SignUpPageComponent,
    UserManagementComponent,
    PetCareComponent,
    PetInquireComponent,
    BlogContentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireStorageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
