import { ShareDataService } from './../share-data.service';
import { FirebaseService } from './../firebase.service';
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

import { UserService } from './../user.service';


import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { element } from 'protractor';
import { Router } from '@angular/router';
import { newArray } from '@angular/compiler/src/util';

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
  ) { }

  ngOnInit(): void {
    // this.users = [];
    this.firebaseService.getAllUsers().snapshotChanges().pipe(
      map (changes => changes.map(c => ({ key: c.payload.key, ...c.payload.val()})
      ))).subscribe(data => {
        // console.log(data);
        data.forEach(element => {
          if (element.message === undefined){
            element.message = [];
          }
          this.users.push(element);
        });
      });
  }

  setSelectedUser(user: any): void {
    this.shareDataService.selectedUser = user;
  }

  setDeleteUser(user): void{
    // console.log(user.key);
    // this.firebaseService.deleteUser(user.key);
    this.deleteUser = user;

  }

  onDelete(): void {
    this.firebaseService.deleteUser(this.deleteUser.key);
    this.reloadComponent();
  }

  reloadComponent(): void{
    this.users = [];
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/user-management']);
  }

  setMessageInfo(user): void{
    this.message = user.message;
  }

  search(id): void{
    this.users.forEach(user => {
      if (user.id === id){
        this.users = [];
        this.users.push(user);
      }
    });
  }
}
