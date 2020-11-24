import {PetSearchComponent} from './pet-search/pet-search.component';
import {LogInPageComponent} from './log-in-page/log-in-page.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {HomePageComponent} from './home-page/home-page.component';
import {PetManagementComponent} from './pet-management/pet-management.component';
import {PetManagementAddComponent} from './pet-management-add/pet-management-add.component';
import {PetManagementViewComponent} from './pet-management-view/pet-management-view.component';
import {UserManagementComponent} from './user-management/user-management.component';
import {PetCareComponent} from './pet-care/pet-care.component';

import {RegisterComponent} from './register/register.component';
import {ProfileComponent} from './profile/profile.component';
import {NewBlogComponent} from './pet-care/blog-table/new-blog/new-blog.component';
import {BlogTableComponent} from './pet-care/blog-table/blog-table.component';

const routes: Routes = [
  {path: 'home-page', component: HomePageComponent},
  {path: 'pet-management', component: PetManagementComponent},
  {path: 'pet-management-add', component: PetManagementAddComponent},
  {path: 'pet-management-view/:id', component: PetManagementViewComponent},
  {path: 'animal/:type/:id', component: PetManagementViewComponent},
  {path: 'pet-management-edit', component: PetManagementAddComponent},
  {path: 'dog-search', component: PetSearchComponent},
  {path: 'cat-search', component: PetSearchComponent},
  {path: 'rabbit-search', component: PetSearchComponent},
  {path: 'small-furry-search', component: PetSearchComponent},
  {path: 'scales-fins-other-search', component: PetSearchComponent},
  {path: 'bird-search', component: PetSearchComponent},
  {path: 'horse-search', component: PetSearchComponent},
  {path: 'barnyard-search', component: PetSearchComponent},
  {path: 'log-in-page', component: LogInPageComponent},
  {path: 'user-management', component: UserManagementComponent},
  {path: 'pet-care', component: PetCareComponent},
  {path: '', redirectTo: 'home-page', pathMatch: 'full'},
  {path: 'register', component: RegisterComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'pet-care/blog-table/new-blog', component: NewBlogComponent},
  {path: 'pet-care/blog-table', component: BlogTableComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
