import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireModule} from '@angular/fire';
import {AngularFireStorageModule} from '@angular/fire/storage';
// import { AngularFirestoreModule } from '@angular/fire';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {environment} from '../environments/environment';
import {AppComponent} from './app.component';
import {NavigationComponent} from './navigation/navigation.component';
import {HomePageComponent} from './home-page/home-page.component';
import {PetManagementComponent} from './pet-management/pet-management.component';
import {PetManagementAddComponent} from './pet-management-add/pet-management-add.component';
import {PetManagementViewComponent} from './pet-management-view/pet-management-view.component';
import {AppRoutingModule} from './app-routing.module';
import {PetSearchComponent} from './pet-search/pet-search.component';
import {FormsModule} from '@angular/forms';
import {LogInPageComponent} from './log-in-page/log-in-page.component';
import {SignUpPageComponent} from './sign-up-page/sign-up-page.component';
import {UserManagementComponent} from './user-management/user-management.component';
import {PetCareComponent} from './pet-care/pet-care.component';
import {HttpClientModule} from '@angular/common/http';
import {PetInquireComponent} from './pet-inquire/pet-inquire.component';
import {AboutComponent} from './about/about.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DialogComponent} from './pet-care/dialog/dialog.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {BlogTableComponent} from './pet-care/blog-table/blog-table.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatInputModule} from '@angular/material/input';
import {NgxPaginationModule} from 'ngx-pagination';
import {RegisterComponent} from './register/register.component';
import {ProfileComponent} from './profile/profile.component';
import {FooterComponent} from './footer/footer.component';
import {NewBlogComponent} from './pet-care/blog-table/new-blog/new-blog.component';

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
    AboutComponent,
    DialogComponent,
    BlogTableComponent,
    RegisterComponent,
    ProfileComponent,
    FooterComponent,
    NewBlogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    MatDialogModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    NgxPaginationModule
  ],
  exports: [
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {}
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
