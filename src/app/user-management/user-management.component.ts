import {ShareDataService} from './../share-data.service';
import {FirebaseService} from './../firebase.service';
// import { UserService } from './../user.service';
// import { Component, OnInit } from '@angular/core';
// import { User } from '../user';
// import { Subscription } from 'rxjs';
// @Component({
//   selector: 'app-user-management',
//   templateUrl: './user-management.component.html',
//   styleUrls: ['./user-management.component.css']
// })
// export class UserManagementComponent implements OnInit {
//   users: User[] = [];
//   constructor(private service: UserService) { }
//   private sub = new Subscription();
//   ngOnInit(): void {
//     this.sub = this.service.getList().subscribe(users => this.users = users);
//   }
// }


import {Component, OnInit} from '@angular/core';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  users: any[] = [];
  deleteUser: any;
  message = [];

  constructor(
    private firebaseService: FirebaseService,
    private shareDataService: ShareDataService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    // this.users = [];
    this.firebaseService.getAllUsers().snapshotChanges().pipe(
      map(changes => changes.map(c => ({key: c.payload.key, ...c.payload.val()})
      ))).subscribe(data => {
<<<<<<< HEAD
        // console.log(data);
        data.forEach(element => {
          if (element.message === undefined){
            element.message = [];
          }
          this.users.push(element);
        });
=======
      data.forEach(element => {
        if (element.message === undefined) {
          element.message = [];
        }
        this.users.push(element);
>>>>>>> 6b8b4384852198a2987a3ab301ea91d4d4d206eb
      });
    });
  }

  setSelectedUser(user: any): void {
    this.shareDataService.selectedUser = user;
  }

<<<<<<< HEAD
  setDeleteUser(user): void{
    // console.log(user.key);
    // this.firebaseService.deleteUser(user.key);
=======
  setDeleteUser(user): void {
>>>>>>> 6b8b4384852198a2987a3ab301ea91d4d4d206eb
    this.deleteUser = user;

  }

  onDelete(): void {
    this.firebaseService.deleteUser(this.deleteUser.key);
    this.reloadComponent();
  }

  reloadComponent(): void {
    this.users = [];
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/user-management']);
  }

  setMessageInfo(user): void {
    this.message = user.message;
  }

<<<<<<< HEAD
  search(id): void{
=======
  search(id): void {
>>>>>>> 6b8b4384852198a2987a3ab301ea91d4d4d206eb
    this.users.forEach(user => {
      if (user.id === id) {
        this.users = [];
        this.users.push(user);
      }
    });
  }
}
