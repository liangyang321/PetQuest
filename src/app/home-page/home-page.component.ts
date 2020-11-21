import { ShareDataService } from './../share-data.service';
import { FirebaseService } from './../firebase.service';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { User } from '../user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  isLogin = true;
  users: User[];
  email: string;
  password: any;
  
  constructor(
    private fb: FirebaseService,
    private shareDataService: ShareDataService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.isLogin = this.shareDataService.getCurrentUser() == null ? true : false;
    this.fb.getAllUsers().snapshotChanges().pipe(
      map (changes => changes.map(c => ({ key: c.payload.key, ...c.payload.val()})
      ))).subscribe(data => this.users = data);
  }

  onSubmit(): void {
    console.log(this.email);
    console.log(this.password);
    this.users.forEach(element => {
      if (element.email === this.email && element.password === this.password){
          this.shareDataService.saveCurrentUser(element);
          this.isLogin = false;
          window.location.reload();
      }
    });
  }
}
