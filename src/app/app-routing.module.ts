import { PetSearchComponent } from './pet-search/pet-search.component';
import { LogInPageComponent } from './log-in-page/log-in-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';

import { HomePageComponent } from './home-page/home-page.component';
import { PetManagementComponent } from './pet-management/pet-management.component';
import { PetManagementAddComponent } from './pet-management-add/pet-management-add.component';
import { PetManagementViewComponent } from './pet-management-view/pet-management-view.component';
import { UserManagementComponent } from './user-management/user-management.component';
import {PetCareComponent} from './pet-care/pet-care.component';
import { AuthGuard } from './auth.guard';

import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: 'home-page', component: HomePageComponent},
  { path: 'pet-management', component: PetManagementComponent},
  { path: 'pet-management-add', component: PetManagementAddComponent},
  { path: 'pet-management-view/:id', component: PetManagementViewComponent},
  { path: 'animal/:type/:id', component: PetManagementViewComponent},
  { path: 'pet-management-edit', component: PetManagementAddComponent},
  { path: 'dog-search', component: PetSearchComponent},
  { path: 'cat-search', component: PetSearchComponent},
  { path: 'log-in-page', component: LogInPageComponent},
  { path: 'user-management', component: UserManagementComponent},
  { path: 'pet-care', component: PetCareComponent},
  { path: '', redirectTo: 'home-page', pathMatch: 'full'},
  { path: 'register', component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }