import { FirebaseService } from './../firebase.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
import { ShareDataService } from '../share-data.service';
import { User } from '../user.model';
import { map } from 'rxjs/operators';
import { element } from 'protractor';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: any;
  allUsers: any[];

  isExisted = false;

  isEdit = false;

  isAdminEdit = false;

  constructor(
    private firebaseService: FirebaseService,
    private shareDataService: ShareDataService,
    private router: Router
    ) { }


  ngOnInit(): void {
    if (this.shareDataService.selectedUser !== null) {

      // this.isNotSelectedFromAdmin = false;
      // this.user = this.shareDataService.selectedUser;
      this.user = this.getCurrentUserFromFirebase(this.shareDataService.selectedUser.email);
      console.log(this.user);
      this.isEdit = true;
      this.isAdminEdit = true;
      this.shareDataService.selectedUser = null;
    } else {
      this.isEdit = this.shareDataService.isEditUser;
      if (this.isEdit) {
        // this.user = this.shareDataService.getCurrentUser();
        this.user = this.getCurrentUserFromFirebase(this.shareDataService.getCurrentUser().email);
        this.shareDataService.isEditUser = false;
      } else {
        this.user = new User();
        this.user.id = 'PQ' + Date.now() + ( (Math.random() * 100000).toFixed());
        this.user.role = 'user';
        this.firebaseService.getAllUsers().snapshotChanges().pipe(
          map (changes => changes.map(c => ({ key: c.payload.key, ...c.payload.val()})
          ))).subscribe(data => this.allUsers = data);
      }

    }
    console.log(this.user);
  }


  getCurrentUserFromFirebase(email): void{
    this.firebaseService.getAllUsers().snapshotChanges().pipe(
      map (changes => changes.map(c => ({ key: c.payload.key, ...c.payload.val()})
      ))).subscribe(data => {
        data.forEach(element => {
          if (element.email === email){
            this.user = element;
          }
        });
      });
  }

  onSubmit(form): void{
    console.log('onSubmit');
    console.log(this.user);
    if (this.isEdit){
      this.updateUser();
    } else {
      this.createNewUser(form);
    }
  }

  updateUser(): void{
    const val = JSON.parse(JSON.stringify(this.user));
    console.log(this.user.key);
    this.firebaseService.updateUser(this.user.key, this.user);

    if (this.isAdminEdit) {
      console.log('this.isAdminEdit');
      this.router.navigate(['/user-management']);
    } else {
      this.reloadComponent();
    }
  }

  createNewUser(form): void{
    this.allUsers.forEach(element => {
      if (element.email === this.user.email) {
        if (!element.id.startsWith('T')){
          this.isExisted = true;
          this.user.email = '';
        }
      }
    });

    if (form.valid && this.isExisted === false) {
      this.shareDataService.saveCurrentUser(this.user);
      const val = JSON.parse(JSON.stringify(this.user));
      this.firebaseService.createUser(val).then(res => {
          console.log('created a user'); });

      this.reloadComponent();
    }
  }

  reloadComponent(): void{
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/home-page']).then(() => {
      // window.location.reload();
      this.shareDataService.sendClickEvent();
    });
  }
}
